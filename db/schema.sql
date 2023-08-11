DROP DATABASE IF EXISTS blog_db;

CREATE DATABASE blog_db;

USE blog_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    UserName varchar(15) NOT NULL,
    FirstName varchar(30) NOT NULL,
    LastName varchar(30),
    Email varchar(320) NOT NULL,
    Password varchar(18) NOT NULL,

)

CREATE TABLE post (
    id INT AUTO_INCREMENT NOT NULL,
    UserName users_UserName,
    Title varchar,
    VenueName location_VenueName,
    EventDate DATE,
    Genre genres_GenreName,
    PostText text(65000),
)

CREATE TABLE location (
    id INT AUTO_INCREMENT NOT NULL,
    VenueName varchar,
    AddressLine1 varchar,
    AddressLine2 varchar,
    City varchar,
    State varchar,
    ZipCode varchar,
    VenueSize INT,
)

CREATE TABLE genres (
    id INT AUTO_INCREMENT NOT NULL,
    GenreName varchar,
)