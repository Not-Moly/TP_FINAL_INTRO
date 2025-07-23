CREATE OR REPLACE FUNCTION delete_orphan_characters_after_game_delete() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM characters
    WHERE id IN (
        SELECT c.id
        FROM characters c
        LEFT JOIN game_characters gc ON gc.id_character = c.id
        WHERE gc.id IS NULL
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_delete_orphan_characters_after_game_delete
AFTER DELETE ON games
FOR EACH ROW
EXECUTE FUNCTION delete_orphan_characters_after_game_delete();