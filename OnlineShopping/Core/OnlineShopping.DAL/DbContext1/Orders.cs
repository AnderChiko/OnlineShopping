﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace OnlineShopping.DAL
{
    public partial class Orders
    {
        public long Id { get; set; }
        public string Number { get; set; }
        public long? UserId { get; set; }
        public string Referance { get; set; }
        public string ImageUrl { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateTimeCreated { get; set; }
    }
}