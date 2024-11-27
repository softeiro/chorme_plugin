var configSBUM = {
    ["DJI Air 2S"]: { // DJI Air 2S
        alternatives:{
        },
        consumable: { // true e igual a troca
            "BC.MA.SS000317.01": false, // Gimbal
            "BC.MA.SS000138.01":false, // ESC
            "BC.MA.SS000306.01": true,  // Core
            "BC.MA.SS000295.01": false, // Front Arm Module (Left)
            "BC.MA.SS000299.01": false, // Front Arm Module (Right)
            "BC.MA.SS000297.01": false, // Rear Arm Module (Left)
            "BC.MA.SS000298.01": false, // Rear Arm Module (Right)
        }
    },
    ["DJI RC-N1 Remote Controller Module"]: {
        alternatives:{
        },
        consumable: {
            "BC.MA.SS000161.01":false, // Telescopic Tube & Antenna Module
            "":false,
            "":false,
            "YC.DZ.BB000085.04":true, //Remote Controller Battery
            "YC.DZ.BB000084.04":true, //Remote Controller Battery
            "YC.DZ.BB000084.03":true, //Remote Controller Battery
            "BC.MA.SS000247.01":true, // Remote Controller Core Board Module
        }
    },
    ["DJI Smart Controller"]:{
        alternatives:{
        },
       consumable: {
            "BC.MA.SS000062.04":true, // RC
        }
    },
    ["DJI RC Remote Controller Module"]:{
        alternatives:{
        },
        consumable: {
            "BC.RC.SS000002.01":true // RC
        }
    },
    ["DJI RC Pro"]:{
        alternatives:{
        },
        consumable: {
            "BC.MA.SS000375.02":true // RC
        }
    }
}