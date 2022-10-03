CREATE DATABASE `tme_shop`;

CREATE TABLE
    `users` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `role` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'USER',
        `email` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `phone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
    `banner` (
        `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(60) NOT NULL DEFAULT '',
        `link` varchar(255) NOT NULL DEFAULT '',
        `image_url` text NOT NULL,
        `content` varchar(255) NOT NULL DEFAULT '',
        `end_time` datetime DEFAULT NULL,
        `created_at` datetime DEFAULT NOW() COMMENT '创建时间',
        `updated_at` datetime DEFAULT NOW() COMMENT '更新时间',
        `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------

-- Records of banner

-- ----------------------------

BEGIN;

INSERT INTO `banner`
VALUES (
        1,
        '新碟首发',
        '',
        'http://p1.music.126.net/QsrMNeG1-2HivLoOSxHeNA==/109951167921652292.jpg',
        '薛之谦',
        NULL,
        NOW(),
        NOW(),
        1
    );

INSERT INTO `banner`
VALUES (
        2,
        '新碟首发',
        '',
        'http://p1.music.126.net/YRJEnF-zkwFWv1DEynW4BQ==/109951167921660160.jpg',
        '邓紫棋',
        NULL,
        NOW(),
        NOW(),
        1
    );

INSERT INTO `banner`
VALUES (
        3,
        '新碟首发',
        '',
        'http://p1.music.126.net/3dYdjEuLQJNoqSRlhWUcZg\=\=/109951167921669645.jpg',
        '徐艺洋',
        NULL,
        NOW(),
        NOW(),
        1
    );

COMMIT;

CREATE TABLE
    `channel` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `name` varchar(45) NOT NULL DEFAULT '',
        `icon_url` varchar(255) NOT NULL DEFAULT '',
        `sort_order` int(4) unsigned NOT NULL DEFAULT '10',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

BEGIN;

INSERT INTO `channel`
VALUES (
        1,
        '华语',
        'http://p2.music.126.net/ZWi_2aS2Ha1jpZhWjLblKQ==/19018252625819610.jpg',
        1,
        NOW(),
        NOW()
    );

INSERT INTO `channel`
VALUES (
        2,
        '流行',
        'http://p1.music.126.net/lQSdy75ANrUcfwbOYPh-mg==/109951167912309871.jpg',
        2,
        NOW(),
        NOW()
    );

INSERT INTO `channel`
VALUES (
        3,
        '粤语',
        'http://p1.music.126.net/Rh7sZDo81-_2WuLPyPgtaA==/109951167652903530.jpg',
        3,
        NOW(),
        NOW()
    );

INSERT INTO `channel`
VALUES (
        4,
        '民谣',
        'http://p1.music.126.net/nNFRAsCzmnHKxZDiZ1ZG3w==/109951166418085843.jpg',
        4,
        NOW(),
        NOW()
    );

INSERT INTO `channel`
VALUES (
        5,
        '轻音乐',
        'http://p2.music.126.net/3KF0SNG6neJQtRU6pyQiDg==/109951163341199285.jpg',
        5,
        NOW(),
        NOW()
    );

COMMIT;

----------------------

--- goods

----------------------

CREATE TABLE
    `goods` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `channel_id` bigint NOT NULL,
        `name` varchar(20) NOT NULL DEFAULT '',
        `author` varchar(10) NOT NULL DEFAULT '',
        `cover` varchar(255) NOT NULL DEFAULT '',
        `url` varchar(255) NOT NULL DEFAULT '',
        `price_ids` varchar(20) NOT NULL DEFAULT '1,2',
        `time` bigint NOT NULL,
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

INSERT INTO `goods`
VALUES (
        2,
        1,
        '稻香',
        '周杰伦',
        'https://p2.music.126.net/BbR3TuhPULMLDV0MjczI4g==/109951165793869641.jpg',
        'http://m7.music.126.net/20221002024217/89fd4e481904a06ed79f7927998601f6/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
        DEFAULT,
        267232,
        NOW(),
        NOW()
    );

INSERT INTO `goods`
VALUES (
        3,
        1,
        '爱回温',
        '温岚',
        'https://p2.music.126.net/qFBonOr2QqUYzWY8IlCuDA==/109951165774753337.jpg',
        'http://m7.music.126.net/20221002024217/89fd4e481904a06ed79f7927998601f6/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
        DEFAULT,
        267232,
        NOW(),
        NOW()
    );

INSERT INTO `goods`
VALUES (
        4,
        1,
        '看我72变',
        '蔡依林',
        'https://p2.music.126.net/qFBonOr2QqUYzWY8IlCuDA==/109951165774753337.jpg',
        'http://m7.music.126.net/20221002024217/89fd4e481904a06ed79f7927998601f6/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
        DEFAULT,
        267232,
        NOW(),
        NOW()
    );

INSERT INTO `goods`
VALUES (
        5,
        1,
        '忘忧草',
        '周华健',
        'https://p1.music.126.net/EgURCf9XRIpdOSKEU2JDIA==/109951165611275294.jpg',
        'http://m7.music.126.net/20221002024217/89fd4e481904a06ed79f7927998601f6/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
        DEFAULT,
        267232,
        NOW(),
        NOW()
    );

----------------------

--- goods price settings

----------------------

CREATE TABLE
    `goods_price` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `price` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '价格',
        `currency` varchar(10) NOT NULL DEFAULT 'CNY' COMMENT '币种',
        `type` smallint NOT NULL COMMENT '类型 1.year 2.month 3.day',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

BEGIN;

INSERT INTO `goods_price`
VALUES (
        1,
        50.00,
        DEFAULT,
        2,
        NOW(),
        NOW()
    );

INSERT INTO `goods_price`
VALUES (
        2,
        500.00,
        DEFAULT,
        1,
        NOW(),
        NOW()
    );

COMMIT;

CREATE TABLE
    `orders` (
        `id` bigint unsigned NOT NULL AUTO_INCREMENT,
        `goods_id` varchar(50) NOT NULL DEFAULT '' COMMENT '商品id',
        `user_id` bigint NOT NULL,
        `order_status` tinyint unsigned NOT NULL COMMENT '0: 创建成功 1: 支付成功 2: 支付失败',
        `price_id` bigint NOT NULL,
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (`id`),
        KEY `user_id` (`user_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;