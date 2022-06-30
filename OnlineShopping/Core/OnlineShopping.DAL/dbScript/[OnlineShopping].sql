
USE [OnlineShopping]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 08/06/2022 02:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[Id] [bigint] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Number] [varchar](100) NULL,
	[UserId] [bigint] NULL,
	[Referance] [varchar](255) NULL,	
	[IsDeleted] [bit] NOT NULL DEFAULT (0),
	[DateTimeCreated] [datetime] NOT NULL  DEFAULT (getdate())
	)
GO

CREATE TABLE [dbo].[OrdersItem](
	[Id] [bigint] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[OrderId] [bigint] NULL,
	[ProductId] [bigint] NULL,
	[Quantity] [int] NULL,
	[UnitPrice] [decimal](18, 2) NULL
	)

GO

CREATE TABLE [dbo].[ProductPrice](
	[Id] [bigint] IDENTITY(1,1)PRIMARY KEY NOT NULL,
	[ProductId] [bigint] NULL,
	[UnitPrice] [decimal](18, 2) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateTimeCreated] [datetime] NOT NULL  DEFAULT (getdate())
	)

GO

CREATE TABLE [dbo].[Product](
	[Id] [bigint] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [varchar](100) NOT NULL ,
	[Description] [varchar](255) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[ImageUrl] [varchar](255) NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateTimeCreated] [datetime] NOT NULL  DEFAULT (getdate())
)

GO

CREATE TABLE [dbo].[User](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[EmailAddress] [varchar](100) PRIMARY KEY NOT NULL,
	[Password] [varchar](255) NOT NULL,	
	[Name] [varchar](255) NULL,
	[DateTimeCreated][datetime] NOT NULL DEFAULT (getdate()) 
)

GO

INSERT INTO [dbo].[Product]([Name] ,[Description],[ImageUrl] ,[Price],[IsActive],[IsDeleted],[DateTimeCreated])
     VALUES
           ('Apples','product 1 description','/assets/products/apple.jpg','25.10',1,0,getdate());
go
		   INSERT INTO [dbo].[Product]([Name] ,[Description],[ImageUrl] ,[Price],[IsActive],[IsDeleted],[DateTimeCreated])
     VALUES
           ('Bananas','product 2 description','/assets/products/banana.jpg','35.60',1,0,getdate());
go
		   INSERT INTO [dbo].[Product]([Name] ,[Description],[ImageUrl] ,[Price],[IsActive],[IsDeleted],[DateTimeCreated])
     VALUES
           ('Mangos','product 3 description','/assets/products/mango1.jpg','55.90',1,0,getdate());
GO
