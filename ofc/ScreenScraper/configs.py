VILLAIN_CONFIG_TYPE_1 = "41eba9f9-c202-4998-9530-2a2a54ad79bf"
VILLAIN_CONFIG_TYPE_2 = "18e98124-96c2-456d-a297-ab304e3ac687"
HERO_NEW_CONFIG = "88cdef3c-614a-45d0-9598-013c89e19da8"
HERO_NEW_MIDDLE_CONFIG = "e8a95951-1dcc-4005-afbc-5fa2a3308cc0"

HERO_CONFIG = "de7ffa8c-bc1d-4a51-a6e1-9075afec608f"
HERO_TOP_INDEX_1_CONFIG = "993e8021-9bf3-4199-9045-2dc9d2258fca"
HERO_MIDDLE_INDEX_0_CONFIG = "52134a12-31c9-46bf-9e7f-357c56e2b95d"
HERO_MIDDLE_INDEX_1_CONFIG = "a00ff788-e152-4bfe-bf43-84f0545d7c47"
HERO_MIDDLE_INDEX_2_CONFIG = "38ce0323-7f94-4f14-8032-e6888633b77b"
HERO_BOTTOM_INDEX_0_CONFIG = "068fc65b-06ab-4429-a3e1-fddfc4117895"
HERO_BOTTOM_INDEX_1_CONFIG = "86e4731d-8784-47c7-827f-47b968d950e1"
HERO_BOTTOM_INDEX_2_CONFIG = "ac0d9338-9aea-4b7d-b635-486c78096714"
HERO_BOTTOM_INDEX_3_CONFIG = "8ccd8aea-f084-4ea3-89d1-84b314fa7ee3"



HERO = [
	{"x": 133,  "y": 528, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 205,  "y": 528, "config": HERO_TOP_INDEX_1_CONFIG, "type": "hero_main"},
	{"x": 276,  "y": 528, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 133,  "y": 622, "config": HERO_MIDDLE_INDEX_0_CONFIG, "type": "hero_main"},
	{"x": 205,  "y": 622, "config": HERO_MIDDLE_INDEX_1_CONFIG, "type": "hero_main"},
	{"x": 276,  "y": 622, "config": HERO_MIDDLE_INDEX_2_CONFIG, "type": "hero_main"},
	{"x": 348,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 419,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 133,  "y": 716, "config": HERO_BOTTOM_INDEX_0_CONFIG, "type": "hero_main"},
	{"x": 205,  "y": 716, "config": HERO_BOTTOM_INDEX_1_CONFIG, "type": "hero_main"},
	{"x": 276,  "y": 716, "config": HERO_BOTTOM_INDEX_2_CONFIG, "type": "hero_main"},
	{"x": 348,  "y": 716, "config": HERO_BOTTOM_INDEX_3_CONFIG, "type": "hero_main"},
	{"x": 419,  "y": 716, "config": HERO_CONFIG, "type": "hero_main"},
]

HERO_NEW = [
	{"x": 135,  "y": 823, "config": HERO_NEW_CONFIG, "type": "hero_new"},
	{"x": 200,  "y": 823, "config": HERO_NEW_MIDDLE_CONFIG, "type": "hero_new"},
	{"x": 266,  "y": 823, "config": HERO_NEW_CONFIG, "type": "hero_new"},
]

VILLAIN_LEFT = [
	{"x": 15,  "y": 138, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
	{"x": 63,  "y": 138, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_left"}, 
	{"x": 112, "y": 138, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"},
	{"x": 15,  "y": 202, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
	{"x": 63,  "y": 202, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_left"}, 
	{"x": 112, "y": 202, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
	{"x": 160, "y": 202, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_left"}, 
	{"x": 209, "y": 202, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
	{"x": 15,  "y": 266, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
	{"x": 63,  "y": 266, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_left"}, 
	{"x": 112, "y": 266, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
	{"x": 160, "y": 266, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_left"}, 
	{"x": 209, "y": 266, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_left"}, 
]

VILLAIN_RIGHT = [
	{"x": 384, "y": 138, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
	{"x": 433, "y": 138, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_right"}, 
	{"x": 481, "y": 138, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
	{"x": 287, "y": 202, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"},
	{"x": 336, "y": 202, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_right"}, 
	{"x": 384, "y": 202, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
	{"x": 433, "y": 202, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_right"}, 
	{"x": 481, "y": 202, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
	{"x": 287, "y": 266, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
	{"x": 335, "y": 266, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_right"}, 
	{"x": 384, "y": 266, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
	{"x": 432, "y": 266, "config": VILLAIN_CONFIG_TYPE_2, "type": "villain_right"}, 
	{"x": 481, "y": 266, "config": VILLAIN_CONFIG_TYPE_1, "type": "villain_right"}, 
]


ALL_CONFIGS = HERO + HERO_NEW + VILLAIN_LEFT + VILLAIN_RIGHT 