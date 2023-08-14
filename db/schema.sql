DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db;

USE blog_db;

CREATE TABLE userAccount (
    id INT AUTO_INCREMENT NOT NULL,
    UserName varchar(25) NOT NULL,
    FirstName varchar(30) NOT NULL,
    LastName varchar(30),
    Email varchar(320) NOT NULL,
    Password varchar(18) NOT NULL,
),

CREATE TABLE userPosts (
    id INT AUTO_INCREMENT NOT NULL,
    UserName varchar(25) NOT NULL,
    Title varchar(25),
    VenueName varchar(25),
    EventDate DATE,
    Genre varchar(25),
    PostText text(65000),
),

CREATE TABLE venues (
    id INT AUTO_INCREMENT NOT NULL,
    VenueName varchar,
    AddressLine1 varchar,
    AddressLine2 varchar,
    City text,
    State text,
    ZipCode INT(5),
    VenueSize varchar(10),
),

CREATE TABLE genres (
    id INT AUTO_INCREMENT NOT NULL,
    GenreName varchar,
),