import csv
import os
import sqlite3
from typing import Any

import pandas


def create_db_from_csv(csv_path: str) -> None:
    conn = sqlite3.connect('temp.db')
    exercises = pandas.read_csv(csv_path)
    exercises.to_sql('exercises', conn, if_exists='append', index=False)

def read_tables(cursor: sqlite3.Cursor) -> None:
    tables = cursor.execute("select name from sqlite_schema where type = 'table' ")
    print(tables.fetchall())

def main():
    db_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'workout_log.db')
    conn = sqlite3.connect(db_path) 
    cursor = conn.cursor()
    read_tables(cursor=cursor)

    cursor.execute("""create table if not exists exercises (
                   id integer primary key autoincrement not null,
                   name text,
                   equipment text,
                   gif text,
                   body_part text
    )""")
    cursor.execute("""create table if not exists programs (
                   id integer primary key autoincrement not null,
                   title text
    )""")

    cursor.execute("""create table if not exists current_rm (
                   id integer primary key autoincrement not null,
                   exercise_id integer,
                   calculated_max integer,
                 foreign key (exercise_id) references exercises(id)
    )""")

    cursor.execute("""create table if not exists sets (
                   id integer primary key autoincrement not null,
                   exercise_id integer,
                   is_amrap bool,
                   num_reps integer,
                   weight integer,
                   foreign key (exercise_id) references exercises (id)
    )""")

    cursor.execute("""create table if not exists completed_sets (
                   id integer primary key autoincrement not null,
                   exercise_id integer,
                   reps_completed integer,
                   weight integer,
                   calculated_1RM real,
                   foreign key (exercise_id) references exercises (id)
    )""")

    cursor.execute("""create table if not exists workouts (
                   id integer primary key autoincrement not null,
                   program_id integer,
                   week integer,
                   day integer,
                   foreign key (program_id) references programs (id)
    )""")

    cursor.execute("""create table if not exists completed_workouts (
                   id integer primary key autoincrement not null,
                   program_id integer,
                   date timestamp,
                   duration integer,
                   foreign key (program_id) references programs (id)
    )""")

    cursor.execute("""create table if not exists completed_workouts_sets (
                   id integer primary key autoincrement not null,
                   set_id integer,
                   workout_id integer,
                   exercise_rank_order integer,
                   foreign key (set_id) references completed_sets (id),
                   foreign key (workout_id) references completed_workouts (id)
    )""")

    cursor.execute("""create table if not exists workouts_sets (
                   id integer primary key autoincrement not null,
                   set_id integer,
                   workout_id integer,
                   exercise_rank_order integer,
                   foreign key (set_id) references sets (id),
                   foreign key (workout_id) references workouts (id)
    )""")
    conn.commit()
    conn.close()

if __name__ == '__main__':
    main()