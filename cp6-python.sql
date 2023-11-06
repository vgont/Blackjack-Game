DROP TABLE T_CPPY_MATCH CASCADE CONSTRAINTS;
DROP SEQUENCE SQ_ID_MATCH;

CREATE TABLE T_CPPY_MATCH
(
    ID_MATCH                NUMBER(9)          NOT NULL,
    SUM_CARDS_WINNER        NUMBER(3)          NOT NULL, 
    SUM_CARDS_LOSER         NUMBER(3)          NOT NULL,
    WINNER_MATCH            VARCHAR(20)        ,
    WINNER_CARDS_DRAWED     NUMBER(3)          NOT NULL,
    LOSER_CARDS_DRAWED      NUMBER(3)          NOT NULL
);

ALTER TABLE T_CPPY_MATCH
ADD CONSTRAINT PK_MATCH PRIMARY KEY (ID_MATCH);

CREATE SEQUENCE SQ_ID_MATCH START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER UPDATE_ID_MATCH
BEFORE INSERT ON T_CPPY_MATCH
FOR EACH ROW
BEGIN
 SELECT SQ_ID_MATCH.NEXTVAL
 INTO :NEW.ID_MATCH
 FROM DUAL;
END;
/