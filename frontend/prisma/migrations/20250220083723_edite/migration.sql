-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "USER";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "forme";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "log";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "options";

-- CreateEnum
CREATE TYPE "USER"."Role" AS ENUM ('USER', 'ADMIN', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "USER"."TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'EMAIL_VERIFICATION');

-- CreateTable
CREATE TABLE "forme"."SystemInfo" (
    "id" TEXT NOT NULL,
    "systemName" VARCHAR(255),
    "developType" VARCHAR(50),
    "contractNo" VARCHAR(100),
    "vendorContactNo" VARCHAR(50),
    "businessUnit" VARCHAR(100),
    "developUnit" VARCHAR(100),
    "computerbackup" VARCHAR(50),
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forme"."EnvironmentInfo" (
    "id" SERIAL NOT NULL,
    "environment" VARCHAR(50),
    "serverName" VARCHAR(255),
    "ip" VARCHAR(20),
    "serverType" VARCHAR(50),
    "serverRole" VARCHAR(100),
    "serverDuty" VARCHAR(100),
    "database" VARCHAR(100),
    "application" VARCHAR(100),
    "operatingSystem" VARCHAR(50),
    "servicePack" VARCHAR(50),
    "build" VARCHAR(50),
    "cpu" VARCHAR(30),
    "ram" VARCHAR(50),
    "disk" VARCHAR(50),
    "dr" VARCHAR(50),
    "joinDomain" VARCHAR(50),
    "windowsCluster" VARCHAR(50),
    "productionUnit" VARCHAR(50)[],
    "systemInfoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnvironmentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forme"."ConnectionInfo" (
    "id" TEXT NOT NULL,
    "ad" VARCHAR(10),
    "adfs" VARCHAR(10),
    "dns" VARCHAR(10),
    "ntp" VARCHAR(10),
    "tpam" VARCHAR(10),
    "netka" VARCHAR(10),
    "fim" VARCHAR(10),
    "ftpServer" VARCHAR(10),
    "ftpGoAnywhereMFTServer" VARCHAR(10),
    "emailSmtp" VARCHAR(10),
    "sms" VARCHAR(10),
    "apiManagement" VARCHAR(10),
    "dv" VARCHAR(10),
    "snmp" VARCHAR(10),
    "systemInfoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConnectionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forme"."SecurityInfo" (
    "id" TEXT NOT NULL,
    "urlWebsite" VARCHAR(255),
    "certificateExpireDate" VARCHAR(100),
    "backupPolicy" VARCHAR(255),
    "downtimeAllowed" VARCHAR(255),
    "centralizeLog" VARCHAR(10),
    "setupAgentPatch" VARCHAR(10),
    "internetFacing" VARCHAR(10),
    "systemInfoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log"."UserSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" VARCHAR(50),
    "userAgent" VARCHAR(255),
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log"."AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "changes" JSONB,
    "userId" TEXT NOT NULL,
    "ipAddress" VARCHAR(50),
    "userAgent" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log"."SystemHistory" (
    "id" TEXT NOT NULL,
    "systemId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "changes" JSONB NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options"."EnvironmentOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."ServerTypeOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."ServerRoleOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."ServerDutyOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."ProductionUnitOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."DeveloperUnitOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."YesNoOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."DrDcOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "options"."DeveloperTypeOption" (
    "option" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "USER"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "viewHistory" BOOLEAN NOT NULL DEFAULT false,
    "canCreateuser" BOOLEAN NOT NULL DEFAULT false,
    "canCreate" BOOLEAN NOT NULL DEFAULT false,
    "canEdit" BOOLEAN NOT NULL DEFAULT false,
    "canDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "USER"."Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER"."UserToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "tokenType" "USER"."TokenType" NOT NULL DEFAULT 'ACCESS',
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "deviceInfo" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_token_key" ON "log"."UserSession"("token");

-- CreateIndex
CREATE UNIQUE INDEX "EnvironmentOption_option_key" ON "options"."EnvironmentOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "ServerTypeOption_option_key" ON "options"."ServerTypeOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "ServerRoleOption_option_key" ON "options"."ServerRoleOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "ServerDutyOption_option_key" ON "options"."ServerDutyOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionUnitOption_option_key" ON "options"."ProductionUnitOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperUnitOption_option_key" ON "options"."DeveloperUnitOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "YesNoOption_option_key" ON "options"."YesNoOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "DrDcOption_option_key" ON "options"."DrDcOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperTypeOption_option_key" ON "options"."DeveloperTypeOption"("option");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "USER"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_token_key" ON "USER"."UserToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_refreshToken_key" ON "USER"."UserToken"("refreshToken");

-- CreateIndex
CREATE INDEX "UserToken_token_idx" ON "USER"."UserToken"("token");

-- CreateIndex
CREATE INDEX "UserToken_userId_idx" ON "USER"."UserToken"("userId");

-- AddForeignKey
ALTER TABLE "forme"."SystemInfo" ADD CONSTRAINT "SystemInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forme"."EnvironmentInfo" ADD CONSTRAINT "EnvironmentInfo_systemInfoId_fkey" FOREIGN KEY ("systemInfoId") REFERENCES "forme"."SystemInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forme"."ConnectionInfo" ADD CONSTRAINT "ConnectionInfo_systemInfoId_fkey" FOREIGN KEY ("systemInfoId") REFERENCES "forme"."SystemInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forme"."SecurityInfo" ADD CONSTRAINT "SecurityInfo_systemInfoId_fkey" FOREIGN KEY ("systemInfoId") REFERENCES "forme"."SystemInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log"."UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log"."AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log"."SystemHistory" ADD CONSTRAINT "SystemHistory_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "forme"."SystemInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log"."SystemHistory" ADD CONSTRAINT "SystemHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "USER"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER"."UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
