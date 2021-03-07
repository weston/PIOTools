VILLAIN_CONFIG_TYPE_1 = "41eba9f9-c202-4998-9530-2a2a54ad79bf"
VILLAIN_CONFIG_TYPE_2 = "18e98124-96c2-456d-a297-ab304e3ac687"
HERO_NEW_CONFIG = "88cdef3c-614a-45d0-9598-013c89e19da8"
HERO_CONFIG = "de7ffa8c-bc1d-4a51-a6e1-9075afec608f"
DISCARD_CONFIG_TL = "122ce7d7-f6aa-4d76-8504-139b388a6b89"
DISCARD_CONFIG_TR = "d10d9178-8b31-4c96-ba99-5fe9252d5c13"
DISCARD_CONFIG_BL = "d10d9178-8b31-4c96-ba99-5fe9252d5c13"
DISCARD_CONFIG_BR = "d10d9178-8b31-4c96-ba99-5fe9252d5c13"

HERO = [
	{"x": 133,  "y": 528, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 205,  "y": 528, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 276,  "y": 528, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 133,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 205,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 276,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 348,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 419,  "y": 622, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 133,  "y": 716, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 205,  "y": 716, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 276,  "y": 716, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 348,  "y": 716, "config": HERO_CONFIG, "type": "hero_main"},
	{"x": 419,  "y": 716, "config": HERO_CONFIG, "type": "hero_main"},
]

HERO_NEW = [
	{"x": 135,  "y": 823, "config": HERO_NEW_CONFIG, "type": "hero_new"},
	{"x": 200,  "y": 823, "config": HERO_NEW_CONFIG, "type": "hero_new"},
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

DISCARD = [
	{"x": 35, "y": 704, "config": DISCARD_CONFIG_TL, "type": "discard"},
	{"x": 71, "y": 704, "config": DISCARD_CONFIG_TR, "type": "discard"}, 
	{"x": 35, "y": 754, "config": DISCARD_CONFIG_BL, "type": "discard"}, 
	{"x": 71, "y": 754, "config": DISCARD_CONFIG_BR, "type": "discard"}, 

]

ALL_CONFIGS = HERO + HERO_NEW + VILLAIN_LEFT + VILLAIN_RIGHT + DISCARD