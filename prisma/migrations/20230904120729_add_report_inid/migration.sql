-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_ibfk_1`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `reportinfo_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `reportinfo_id` ON `event`(`reportinfo_id`);

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`audit_records_id`) REFERENCES `auditrecords`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`reportinfo_id`) REFERENCES `reportinfo`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
