-- DeveloperTypeOption
INSERT INTO options."DeveloperTypeOption" (option) VALUES
('OUTSOURCE'),
('IN HOUSE');

-- DeveloperUnitOption
INSERT INTO options."DeveloperUnitOption" (option) VALUES
('ฝรล'),
('ส่วนระบบงานสนับสนุน'),
('ระบบสนับสนุนนโยบายรัฐ'),
('ธนรัตน์ เกรอด');

-- DrDcOption
INSERT INTO options."DrDcOption" (option) VALUES
('DR'),
('DC');

-- EnvironmentOption
INSERT INTO options."EnvironmentOption" (option) VALUES
('DEV'),
('SIT'),
('UAT'),
('PreProd'),
('Prod');

-- ProductionUnitOption
INSERT INTO options."ProductionUnitOption" (option) VALUES
('หน่วยโปรแกรมระบบ'),
('หน่วยระบบงานคอมพิวเตอร์ 1'),
('หน่วยระบบงานคอมพิวเตอร์ 2'),
('หน่วยระบบงานคอมพิวเตอร์ 3'),
('หน่วยระบบฐานข้อมูล'),
('หน่วยระบบสนับสนุนนโยบายรัฐ'),
('หน่วยระบบสนับสนุนงานธุรกิจ');

-- ServerDutyOption
INSERT INTO options."ServerDutyOption" (option) VALUES
('Web Frontend'),
('Service Web Backend'),
('Backup Server'),
('Database Server'),
('Server Fileshare'),
('Log Server'),
('Gateway Server');

-- ServerRoleOption
INSERT INTO options."ServerRoleOption" (option) VALUES
('Database Server'),
('Application Server'),
('Web Server');

-- ServerTypeOption
INSERT INTO options."ServerTypeOption" (option) VALUES
('Physical'),
('Network Device'),
('WorkStation PC'),
('Laptop'),
('Virtualize Environment'),
('Container');

-- YesNoOption
INSERT INTO options."YesNoOption" (option) VALUES
('YES'),
('NO');