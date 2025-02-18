
import * as z from 'zod';

export const systemSchema = z.object({
    //user: z.null()
  id: z.string(),
  systemName: z.string(),
  developType: z.enum(['OUTSOURCE', 'IN HOUSE']),
  contractNo: z.string(),
  vendorContactNo: z.string(),
  businessUnit: z.string(),
  developUnit: z.string(),
  computerbackup: z.string(),
  // userId: z.number().nullable(),
  // createdAt: z.string().datetime(),
  // updatedAt: z.string().datetime(),
  environmentInfo: z.array(z.object({
     id: z.string(),
    environment: z.string(),
    serverName: z.string(),
    ip: z.string(),
    serverType: z.string(),
    serverRole: z.string(),
    serverDuty: z.string(),
    database: z.string(),
    application: z.string(),
    operatingSystem: z.string(),
    servicePack: z.string(),
    build: z.string(),
    cpu: z.string(),
    ram: z.string(),
    disk: z.string(),
    dr: z.string(),
    joinDomain: z.string(),
    windowsCluster: z.string(),
    productionUnit: z.array(z.string()),
    systemInfoId: z.string(),
    // createdAt: z.string().datetime(),
    // updatedAt: z.string().datetime()
  })),
  connectionInfo: z.array(z.object({
    id: z.number(),
    ad: z.string(),
    adfs: z.string(),
    dns: z.string(),
    ntp: z.string(),
    tpam: z.string(),
    netka: z.string(),
    fim: z.string(),
    ftpServer: z.string(),
    ftpGoAnywhereMFTServer: z.string(),
    emailSmtp: z.string(),
    sms: z.string(),
    apiManagement: z.string(),
    dv: z.string(),
    snmp: z.string(),
    systemInfoId: z.string(),
    // createdAt: z.string().datetime(),
    // updatedAt: z.string().datetime()
  })),
  securityInfo: z.array(z.object({
    id: z.string(),
    urlWebsite: z.string().url(),
    certificateExpireDate: z.string(),
    backupPolicy: z.string(),
    downtimeAllowed: z.string(),
    centralizeLog: z.string(),
    setupAgentPatch: z.string(),
    internetFacing: z.string(),
    systemInfoId: z.string(),
    // createdAt: z.string().datetime(),
    // updatedAt: z.string().datetime()
  })),

});
