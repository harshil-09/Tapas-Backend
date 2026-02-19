--------------- Get User Name ----------------
CREATE PROCEDURE [dbo].[SP_GetUserName]
	@userName VARCHAR(50) = 'admin'
AS
BEGIN 
	SET NOCOUNT ON;
	BEGIN TRY
		IF EXISTS (SELECT 1 FROM user_master WHERE userName = @userName)
    BEGIN
        SELECT 
            userId, roleId, userName, passWord
           FROM user_master
        WHERE userName = @userName;
    END
    ELSE
    BEGIN
        THROW 50001, 'User name not found', 1;
    END
	END TRY

	BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
	END CATCH
END



--------------- Create Session ----------------
CREATE PROCEDURE [dbo].[SP_CreateSession]
    @userId BIGINT,
    @token VARCHAR(512),
    @ipAddress VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO session_master
    (
        userId, token, createdAt, updatedAt, ipAddress
    )
    VALUES
    (
        @userId, @token, SYSDATETIME(), SYSDATETIME(), @ipAddress
    );

    SELECT 
        UM.userId,
        UM.userName,
        SM.token
    FROM user_master UM
    INNER JOIN session_master SM 
        ON UM.userId = SM.userId
    WHERE UM.userId = @userId
      AND SM.token = @token;
END;



--------------- Check User Session ----------------
CREATE PROCEDURE [dbo].[SP_CheckUserSession]
    @userId BIGINT,
    @token VARCHAR(512)
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH LatestSession AS (
        SELECT TOP 1
            sm.*
        FROM session_master sm
        WHERE sm.userId = @userId
          AND sm.logoutType IS NULL
        ORDER BY sm.sessionId DESC 
    )
    SELECT 
        ls.userId,
        um.userName,
        um.roleId,
        rm.roleName,
        ls.token,
        ls.logoutType,
        ls.createdAt
    FROM LatestSession ls
    INNER JOIN user_master um ON um.userId = ls.userId 
    INNER JOIN role_master rm ON rm.roleId = um.roleId 
    WHERE  
		um.isActive = 1 AND
		rm.isActive = 1 AND
         ls.token = @token;
END;




--------------- Update Session ----------------
CREATE PROCEDURE [dbo].[SP_UpdateSession]
    @userId BIGINT,
    @token VARCHAR(512)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE session_master
    SET 
        logoutType = 'Logout',
        updatedAt = SYSDATETIME()
    WHERE 
        userId = @userId
        AND token = @token
        AND logoutType IS NULL;
END;