-- CreateTable
CREATE TABLE `administrativearea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `parent_id` INTEGER NULL,
    `level` TINYINT NULL,
    `user_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `parent_id`(`parent_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `area_policestation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `police_station_id` INTEGER NULL,
    `administrative_area_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `administrative_area_id`(`administrative_area_id`),
    INDEX `police_station_id`(`police_station_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auditrecords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_type` VARCHAR(50) NULL,
    `request_data` JSON NULL,
    `user_id` INTEGER NULL,
    `officer_id` INTEGER NULL,
    `person_id` INTEGER NULL,
    `status` TINYINT NULL,
    `request_time` DATETIME(0) NULL,
    `review_time` DATETIME(0) NULL,
    `review_comments` TEXT NULL,
    `priority` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `officer_id`(`officer_id`),
    INDEX `person_id`(`person_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `changerecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `change_time` DATETIME(0) NULL,
    `change_item` VARCHAR(100) NULL,
    `content_before` VARCHAR(500) NULL,
    `content_after` VARCHAR(500) NULL,
    `audit_records_id` INTEGER NULL,
    `personal_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `priority` INTEGER NULL,

    INDEX `audit_records_id`(`audit_records_id`),
    INDEX `personal_id`(`personal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disabilityinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personal_id` INTEGER NULL,
    `disability_id` VARCHAR(100) NULL,
    `disability_type` VARCHAR(100) NULL,
    `disability_subsidy` DECIMAL(10, 2) NULL,
    `severe_disability_subsidy` DECIMAL(10, 2) NULL,
    `disability_level` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `economicinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personal_id` INTEGER NULL,
    `planting_breeding` VARCHAR(50) NULL,
    `plant_type` VARCHAR(50) NULL,
    `plant_quantity` INTEGER NULL,
    `breeding_type` VARCHAR(50) NULL,
    `breeding_quantity` INTEGER NULL,
    `business_info` VARCHAR(200) NULL,
    `business_location` VARCHAR(200) NULL,
    `license_number` VARCHAR(100) NULL,
    `fire_equipment_type` VARCHAR(100) NULL,
    `fire_equipment_quantity` INTEGER NULL,
    `surveillance_status` VARCHAR(50) NULL,
    `surveillance_quantity` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `planting_area` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` INTEGER NULL,
    `receiver_id` INTEGER NULL,
    `event_type` VARCHAR(200) NULL,
    `link` VARCHAR(500) NULL,
    `status` VARCHAR(50) NULL,
    `audit_records_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `audit_records_id`(`audit_records_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `familyinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personal_id` INTEGER NULL,
    `member_id` INTEGER NULL,
    `member_relation` VARCHAR(50) NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `household_id` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creator_id` INTEGER NULL,
    `area_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `name` VARCHAR(255) NULL,
    `grid_leader_id` INTEGER NULL,

    INDEX `area_id`(`area_id`),
    INDEX `grid_leader_id`(`grid_leader_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grid_police` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grid_user_id` INTEGER NULL,
    `police_user_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grid_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `police_user_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `grid_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `healthinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personal_id` INTEGER NULL,
    `child_number` INTEGER NULL,
    `special_group` VARCHAR(100) NULL,
    `remark_one` VARCHAR(200) NULL,
    `remark_two` VARCHAR(100) NULL,
    `health_insurance` VARCHAR(100) NULL,
    `pension_insurance` VARCHAR(100) NULL,
    `vaccination_status` VARCHAR(100) NULL,
    `proof_contraindication` VARCHAR(100) NULL,
    `marriage_status` VARCHAR(50) NULL,
    `supervisor_name` VARCHAR(100) NULL,
    `other_conditions` VARCHAR(100) NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pid` INTEGER NULL,
    `name` VARCHAR(200) NULL,
    `url` VARCHAR(200) NULL,
    `permissions` VARCHAR(500) NULL,
    `menu_type` TINYINT UNSIGNED NULL,
    `icon` VARCHAR(50) NULL,
    `sort` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `update_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `event_id` INTEGER NULL,
    `is_read` BOOLEAN NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personalinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `certificate_type` INTEGER NULL,
    `id_card` VARCHAR(50) NULL,
    `phone` VARCHAR(50) NULL,
    `residence` VARCHAR(200) NULL,
    `current_address` VARCHAR(200) NULL,
    `pinyin` VARCHAR(100) NULL,
    `nickname` VARCHAR(50) NULL,
    `former_name` VARCHAR(50) NULL,
    `date_of_residence` DATETIME(0) NULL,
    `person_classification` VARCHAR(10) NULL,
    `classification_reason` JSON NULL,
    `petition` VARCHAR(255) NULL,
    `reserve1` VARCHAR(255) NULL,
    `reserve2` VARCHAR(255) NULL,
    `reserve3` VARCHAR(255) NULL,
    `reserve4` VARCHAR(255) NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `age` INTEGER NULL,
    `height` DECIMAL(10, 2) NULL,
    `grid_user_id` INTEGER NULL,
    `gender` BOOLEAN NULL,
    `head_url` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `policestation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `user_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `politicalinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personal_id` INTEGER NULL,
    `work_unit` VARCHAR(100) NULL,
    `position` VARCHAR(100) NULL,
    `political_status` VARCHAR(50) NULL,
    `party_organization` VARCHAR(50) NULL,
    `religion` VARCHAR(100) NULL DEFAULT '无',
    `nationality` VARCHAR(50) NULL,
    `education` VARCHAR(50) NULL,
    `military_service` VARCHAR(50) NULL,
    `school` VARCHAR(100) NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propertyinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personal_id` INTEGER NULL,
    `house_info` VARCHAR(200) NULL,
    `house_owner` VARCHAR(100) NULL,
    `house_area` DECIMAL(10, 2) NULL,
    `hobbies` VARCHAR(200) NULL,
    `car_model` VARCHAR(50) NULL,
    `car_plate` VARCHAR(50) NULL,
    `car_owner` VARCHAR(50) NULL,
    `car_color` VARCHAR(50) NULL,
    `house_type` VARCHAR(50) NULL,
    `house_condition` VARCHAR(50) NULL,
    `smoking_status` INTEGER NULL,
    `volunteer_status` JSON NULL,
    `social_worker` JSON NULL,
    `driving_license_type` VARCHAR(50) NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reportinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `issue_level` VARCHAR(50) NULL,
    `classification_basis` VARCHAR(500) NULL,
    `image_url` VARCHAR(1000) NULL,
    `priority` INTEGER NULL,
    `public_demand` VARCHAR(1000) NULL,
    `public_opinion` VARCHAR(1000) NULL,
    `reporter_id` INTEGER NULL,
    `report_time` DATETIME(0) NULL,
    `report_address` VARCHAR(1000) NULL,
    `police_id` INTEGER NULL,
    `police_opinion` VARCHAR(1000) NULL,
    `processing_time` DATETIME(0) NULL,
    `processing_status` VARCHAR(50) NULL,
    `creator_id` INTEGER NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `create_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `reporter_evaluate` VARCHAR(500) NULL,
    `reporter_star_rating` INTEGER NULL,

    INDEX `reporter_id`(`reporter_id`),
    INDEX `police_id`(`police_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `remark` VARCHAR(100) NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `police_station_id` INTEGER NULL,
    `grid_id` JSON NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `role_user_ibfk_1`(`role_id`),
    INDEX `role_user_ibfk_2`(`user_id`),
    INDEX `role_user_ibfk_3`(`police_station_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_card` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `real_name` VARCHAR(50) NOT NULL,
    `head_url` MEDIUMTEXT NULL,
    `gender` TINYINT NOT NULL,
    `mobile` VARCHAR(25) NOT NULL,
    `status` TINYINT NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `updater_id` INTEGER NOT NULL,
    `update_time` DATETIME(0) NOT NULL,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `personal_id` INTEGER NULL,

    UNIQUE INDEX `id_card`(`id_card`),
    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `mobile`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userloglogin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation` TINYINT NULL,
    `status` TINYINT NULL,
    `user_agent` VARCHAR(500) NULL,
    `ip` VARCHAR(32) NULL,
    `username` VARCHAR(50) NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userlogoperation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation` INTEGER NULL,
    `request_query` TEXT NULL,
    `request_type` VARCHAR(50) NULL,
    `request_params` TEXT NULL,
    `request_time` BIGINT NULL,
    `user_agent` VARCHAR(500) NULL,
    `ip` VARCHAR(32) NULL,
    `status` TINYINT UNSIGNED NULL,
    `creator_name` VARCHAR(50) NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `user_id` INTEGER NULL,
    `administrative_area_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `administrative_area_id`(`administrative_area_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `community_policestation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `community_id` INTEGER NULL,
    `police_station_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `community_id`(`community_id`),
    INDEX `police_station_id`(`police_station_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grid_community` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grid_id` INTEGER NULL,
    `community_id` INTEGER NULL,
    `creator_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `updater_id` INTEGER NULL,
    `update_time` DATETIME(0) NULL,
    `is_delete` BOOLEAN NULL DEFAULT false,

    INDEX `grid_community_ibfk_1`(`grid_id`),
    INDEX `grid_community_ibfk_2`(`community_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `administrativearea` ADD CONSTRAINT `administrativearea_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `administrativearea` ADD CONSTRAINT `administrativearea_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `administrativearea`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `area_policestation` ADD CONSTRAINT `area_policestation_ibfk_1` FOREIGN KEY (`administrative_area_id`) REFERENCES `administrativearea`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `area_policestation` ADD CONSTRAINT `area_policestation_ibfk_2` FOREIGN KEY (`police_station_id`) REFERENCES `policestation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auditrecords` ADD CONSTRAINT `auditrecords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auditrecords` ADD CONSTRAINT `auditrecords_ibfk_2` FOREIGN KEY (`officer_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auditrecords` ADD CONSTRAINT `auditrecords_ibfk_3` FOREIGN KEY (`person_id`) REFERENCES `personalinfo`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `changerecord` ADD CONSTRAINT `changerecord_ibfk_1` FOREIGN KEY (`audit_records_id`) REFERENCES `auditrecords`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `changerecord` ADD CONSTRAINT `changerecord_ibfk_2` FOREIGN KEY (`personal_id`) REFERENCES `personalinfo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`audit_records_id`) REFERENCES `auditrecords`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grid` ADD CONSTRAINT `grid_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `administrativearea`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grid` ADD CONSTRAINT `grid_ibfk_2` FOREIGN KEY (`grid_leader_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `policestation` ADD CONSTRAINT `policestation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reportinfo` ADD CONSTRAINT `reportinfo_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reportinfo` ADD CONSTRAINT `reportinfo_ibfk_2` FOREIGN KEY (`police_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_ibfk_2` FOREIGN KEY (`police_station_id`) REFERENCES `policestation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_ibfk_1` FOREIGN KEY (`administrative_area_id`) REFERENCES `administrativearea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
