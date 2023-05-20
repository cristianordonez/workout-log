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
                   title text not null, 
                   total_length integer,
                   no_weeks integer,
                   no_workouts_per_week integer,
                   update_1rm_frequency text check(update_1rm_frequency = 'daily' | update_1rm_frequency = 'weekly' |update_1rm_frequency = 'end'|update_1rm_frequency = 'never' )
    )""")

    cursor.execute('drop table if exists workouts')
    cursor.execute("""create table if not exists workouts (
                   id integer primary key autoincrement not null,
                   program_id integer not null,
                   week_rank integer not null,
                   workout_rank integer not null,
                   foreign key (program_id) references programs (id)
    )""")

    cursor.execute("""create table if not exists sets (
                   id integer primary key autoincrement not null,
                   exercise_id integer not null,
                   is_amrap bool not null,
                   no_reps integer,
                   weight integer,
                   exercise_rank_order integer not null,
                   set_rank_order integer not null,
                   type text check(type = 'percentage' | type = 'absolute' | type='other'),
                   percentage_multiplier integer,
                   workout_id integer not null,
                   foreign key (exercise_id) references exercises (id),
                   foreign key (workout_id) references workouts (id)

    )""")


    cursor.execute("""create table if not exists completed_sets (
                   id integer primary key autoincrement not null,
                   exercise_id integer,
                   reps_completed integer not null,
                   weight integer not null,
                   calculated_1RM real,
                   exercise_rank_order integer not null,
                   set_rank_order not null,
                   was_amrap boolean not null,
                   completed_workout_id integer not null,
                   foreign key (exercise_id) references exercises (id),
                   foreign key (completed_workout_id) references completed_workouts (id)
    )""")


    cursor.execute("""create table if not exists completed_workouts (
                   id integer primary key autoincrement not null,
                   program_id integer,
                   date timestamp not null,
                   duration integer not null,
                   title text not null,
                   foreign key (program_id) references programs (id)
    )""")


    cursor.execute("""create table if not exists training_maxes (
                   id integer primary key autoincrement not null,
                   exercise_id integer not null,
                   max integer not null,
                   foreign key (exercise_id) references exercises (id)
    )""")

    cursor.execute("""create table if not exists user (
                   id integer primary key autoincrement not null,
                   program_id integer not null,
                   height integer,
                   dob timestamp,
                   gender text,
                   current_program_week integer,
                   next_program_workout integer,
                   foreign key (program_id) references programs (id)
    )""")
    cursor.execute("""create table if not exists weight (
                   id integer primary key autoincrement not null,
                   date timestamp default current_timestamp,
                   weight integer not null
    )""")
    conn.commit()
    conn.close()

if __name__ == '__main__':
    main()