 CREATE TABLE user_master (
    userId BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    roleId INT NOT NULL,
    userName VARCHAR(50) NOT NULL,
    passWord VARCHAR(30) NOT NULL,
    isActive BIT DEFAULT 1,
    createdAt DATETIME2(3) DEFAULT SYSDATETIME(),
    updatedAt DATETIME2(3) NULL,
    ipAddress VARCHAR(25),
);


CREATE TABLE role_master (
    roleId INT NOT NULL PRIMARY KEY,
    roleName VARCHAR(50) NOT NULL,
    isActive BIT,
    updatedAt DATETIME2(3) NULL,
);


CREATE TABLE session_master (
    sessionId BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    userId BIGINT NOT NULL,
    token VARCHAR(512) NOT NULL,
    logoutType VARCHAR(50),
    createdAt DATETIME2(3) DEFAULT SYSDATETIME(),
    updatedAt DATETIME2(3) NULL,
    ipAddress VARCHAR(25),
);