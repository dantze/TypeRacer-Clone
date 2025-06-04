/*
  # TypeRacer Game Schema

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `words` (text array)
      - `is_open` (boolean)
      - `is_over` (boolean) 
      - `start_time` (bigint)
      - `created_at` (timestamp)

    - `players`
      - `id` (uuid, primary key)
      - `game_id` (uuid, foreign key)
      - `socket_id` (text)
      - `nickname` (text)
      - `current_word_index` (integer)
      - `is_party_leader` (boolean)
      - `wpm` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for read/write access
*/

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  words text[] NOT NULL DEFAULT '{}',
  is_open boolean DEFAULT true,
  is_over boolean DEFAULT false,
  start_time bigint,
  created_at timestamptz DEFAULT now()
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES games(id) ON DELETE CASCADE,
  socket_id text NOT NULL,
  nickname text NOT NULL,
  current_word_index integer DEFAULT 0,
  is_party_leader boolean DEFAULT false,
  wpm integer DEFAULT -1,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow full access to games"
  ON games
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access to players"
  ON players
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);