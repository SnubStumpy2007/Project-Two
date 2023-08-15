DROP DATABASE IF EXISTS blog_db;

CREATE DATABASE blog_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    UserName varchar(15) NOT NULL,
    FirstName varchar(30) NOT NULL,
    LastName varchar(30),
    Email varchar(320) NOT NULL,
    Password varchar(18) NOT NULL,

),

CREATE TABLE post (
    id INT AUTO_INCREMENT NOT NULL,
    UserName varchar(30),
    FOREIGN KEY UserName REFERENCES users(UserName),
    Title varchar,
    VenueName varchar,
    FOREIGN KEY VenueName REFERENCES venues(VenueName),
    EventDate DATE,
    Genre varchar,
    FOREIGN KEY Genre REFERENCES genres(GenreName),
    PostText text(65000),
),

CREATE TABLE venues (
    id INT AUTO_INCREMENT NOT NULL,
    VenueName varchar,
    AddressLine1 varchar,
    AddressLine2 varchar,
    City varchar,
    State varchar,
    ZipCode varchar,
    VenueSize INT,
),

CREATE TABLE genres (
    id INT AUTO_INCREMENT NOT NULL,
    GenreName varchar,
),