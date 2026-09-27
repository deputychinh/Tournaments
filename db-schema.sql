-- Schema for the Esports Tournament Organizer.
-- Mounted before seed.sql (00-schema.sql < 01-seed.sql) so MySQL's
-- docker-entrypoint-initdb.d scripts run in the correct order.

CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_players_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  start_time DATETIME NOT NULL,
  max_players INT NOT NULL,
  status ENUM('scheduled', 'ongoing', 'completed') NOT NULL DEFAULT 'scheduled',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tournament_players (
  tournament_id INT NOT NULL,
  player_id INT NOT NULL,
  joined_at DATETIME NOT NULL,
  PRIMARY KEY (tournament_id, player_id),
  CONSTRAINT fk_tp_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments (id) ON DELETE CASCADE,
  CONSTRAINT fk_tp_player FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tournament_id INT NOT NULL,
  round INT NOT NULL,
  match_number INT NOT NULL,
  player1_id INT NULL,
  player2_id INT NULL,
  scheduled_at DATETIME NULL,
  winner_id INT NULL,
  reported_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_matches_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments (id) ON DELETE CASCADE,
  CONSTRAINT fk_matches_player1 FOREIGN KEY (player1_id) REFERENCES players (id) ON DELETE SET NULL,
  CONSTRAINT fk_matches_player2 FOREIGN KEY (player2_id) REFERENCES players (id) ON DELETE SET NULL,
  CONSTRAINT fk_matches_winner FOREIGN KEY (winner_id) REFERENCES players (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
