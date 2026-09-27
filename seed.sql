-- Indexes
CREATE INDEX idx_tournament_players_t ON tournament_players (tournament_id);
CREATE INDEX idx_tournament_players_p ON tournament_players (player_id);
CREATE INDEX idx_matches_t ON matches (tournament_id);

-- Tournaments (300)
SET @base := '2025-08-17 15:00:00';
INSERT INTO tournaments (name, start_time, max_players, status)
WITH RECURSIVE seq(n) AS (
  SELECT 0
  UNION ALL
  SELECT n+1 FROM seq WHERE n+1 < 400
)
SELECT
  CONCAT('Tournament ', n+1),
  DATE_ADD(@base, INTERVAL n HOUR),
  CASE
    WHEN (n % 4) = 0 THEN 16
    WHEN (n % 4) = 1 THEN 32
    WHEN (n % 4) = 2 THEN 8
    ELSE 24
  END,
  CASE
    WHEN (n % 10) < 7 THEN 'scheduled'
    WHEN (n % 10) IN (7,8) THEN 'ongoing'
    ELSE 'completed'
  END
FROM seq
LIMIT 300;

-- Players (200 + extras)
INSERT INTO players (username, email)
WITH RECURSIVE seq(n) AS (
  SELECT 1
  UNION ALL
  SELECT n+1 FROM seq WHERE n+1 <= 200
)
SELECT CONCAT('player', n), CONCAT('player', n, '@example.com') FROM seq;

INSERT INTO players (username, email) VALUES
('★nova', 'nova@example.com'),
('Señor_Árbol', 'arbol@example.com'),
('王者', 'king@example.com'),
('Léa-IRL', 'lea@example.com');

-- Tournament Players
INSERT INTO tournament_players (tournament_id, player_id, joined_at)
SELECT 1, id, DATE_ADD(NOW(), INTERVAL -(id) MINUTE) FROM players WHERE id BETWEEN 1 AND 16;

INSERT INTO tournament_players (tournament_id, player_id, joined_at)
SELECT 2, id, DATE_ADD(NOW(), INTERVAL -(id) MINUTE) FROM players WHERE id BETWEEN 1 AND 32;

INSERT INTO tournament_players (tournament_id, player_id, joined_at)
SELECT 3, id, DATE_ADD(NOW(), INTERVAL -(id) MINUTE) FROM players WHERE id BETWEEN 33 AND 45;

INSERT INTO tournament_players (tournament_id, player_id, joined_at)
SELECT
  t.id, p.id,
  DATE_ADD(NOW(), INTERVAL -FLOOR(RAND()*1000) MINUTE)
FROM tournaments t
JOIN players p ON p.id <= 200
WHERE t.id BETWEEN 4 AND 60
  AND (p.id % (4 + (t.id % 7))) = 0;

INSERT INTO tournament_players (tournament_id, player_id, joined_at)
SELECT
  t.id, p.id,
  DATE_ADD(NOW(), INTERVAL -FLOOR(RAND()*500) MINUTE)
FROM tournaments t
JOIN players p ON p.id <= 120
WHERE t.id BETWEEN 61 AND 120
  AND (p.id % (10 + (t.id % 5))) = 0;

-- Matches for Tournament 1 (16 players)
INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id, scheduled_at)
VALUES
(1, 1, 1, 1, 2,  DATE_ADD(@base, INTERVAL 1 HOUR)),
(1, 1, 2, 3, 4,  DATE_ADD(@base, INTERVAL 1 HOUR)),
(1, 1, 3, 5, 6,  DATE_ADD(@base, INTERVAL 2 HOUR)),
(1, 1, 4, 7, 8,  DATE_ADD(@base, INTERVAL 2 HOUR)),
(1, 1, 5, 9, 10, DATE_ADD(@base, INTERVAL 3 HOUR)),
(1, 1, 6, 11,12, DATE_ADD(@base, INTERVAL 3 HOUR)),
(1, 1, 7, 13,14, DATE_ADD(@base, INTERVAL 4 HOUR)),
(1, 1, 8, 15,16, DATE_ADD(@base, INTERVAL 4 HOUR));

INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id)
VALUES
(1, 2, 1, NULL, NULL),
(1, 2, 2, NULL, NULL),
(1, 2, 3, NULL, NULL),
(1, 2, 4, NULL, NULL),
(1, 3, 1, NULL, NULL),
(1, 3, 2, NULL, NULL),
(1, 4, 1, NULL, NULL);

-- Matches for Tournament 2 (32 players)
INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id, scheduled_at)
VALUES
(2, 1, 1, 1, 2,  DATE_ADD(@base, INTERVAL 5 HOUR)),
(2, 1, 2, 3, 4,  DATE_ADD(@base, INTERVAL 5 HOUR)),
(2, 1, 3, 5, 6,  DATE_ADD(@base, INTERVAL 5 HOUR)),
(2, 1, 4, 7, 8,  DATE_ADD(@base, INTERVAL 5 HOUR)),
(2, 1, 5, 9, 10, DATE_ADD(@base, INTERVAL 6 HOUR)),
(2, 1, 6, 11,12, DATE_ADD(@base, INTERVAL 6 HOUR)),
(2, 1, 7, 13,14, DATE_ADD(@base, INTERVAL 6 HOUR)),
(2, 1, 8, 15,16, DATE_ADD(@base, INTERVAL 6 HOUR)),
(2, 1, 9, 17,18, DATE_ADD(@base, INTERVAL 7 HOUR)),
(2, 1,10, 19,20, DATE_ADD(@base, INTERVAL 7 HOUR)),
(2, 1,11, 21,22, DATE_ADD(@base, INTERVAL 7 HOUR)),
(2, 1,12, 23,24, DATE_ADD(@base, INTERVAL 7 HOUR)),
(2, 1,13, 25,26, DATE_ADD(@base, INTERVAL 8 HOUR)),
(2, 1,14, 27,28, DATE_ADD(@base, INTERVAL 8 HOUR)),
(2, 1,15, 29,30, DATE_ADD(@base, INTERVAL 8 HOUR)),
(2, 1,16, 31,32, DATE_ADD(@base, INTERVAL 8 HOUR));

INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id)
SELECT 2, 2, n, NULL, NULL FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
                                  UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8) r;
INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id)
SELECT 2, 3, n, NULL, NULL FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) r;
INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id)
SELECT 2, 4, n, NULL, NULL FROM (SELECT 1 n UNION ALL SELECT 2) r;
INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id)
VALUES (2, 5, 1, NULL, NULL);

-- Matches for Tournament 3 (odd participants)
INSERT INTO matches (tournament_id, round, match_number, player1_id, player2_id)
VALUES
(3, 1, 1, 33, 34),
(3, 1, 2, 35, 36),
(3, 1, 3, 37, NULL),
(3, 1, 4, 38, 39),
(3, 2, 1, NULL, NULL),
(3, 2, 2, NULL, NULL),
(3, 3, 1, NULL, NULL);

-- Adjust a few tournament times
UPDATE tournaments SET start_time = DATE_ADD(@base, INTERVAL -72 HOUR) WHERE id IN (5, 15, 25);
UPDATE tournaments SET start_time = DATE_ADD(@base, INTERVAL 240 HOUR) WHERE id IN (6, 16, 26);

-- Mark a few winners
UPDATE matches SET winner_id = player1_id, reported_at = NOW() WHERE tournament_id IN (1,2) AND round = 1 AND match_number IN (1,5,9,13);
