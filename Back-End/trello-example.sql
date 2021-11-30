CREATE SEQUENCE trello_list_sequence_seq;

Create table trello_list (
list_id bigint PRIMARY KEY DEFAULT nextval('trello_list_sequence_seq'::regclass),
list_name text NOT NULL,
created_date timestamp without time zone
);

CREATE SEQUENCE trello_card_sequence_seq;

Create table trello_cards (
card_id bigint PRIMARY KEY DEFAULT nextval('trello_card_sequence_seq'::regclass),
list_id bigint REFERENCES trello_list(list_id),
card_title text NOT NULL,
card_description text,	
created_date timestamp without time zone
);
