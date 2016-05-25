using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Lab3.Models;

namespace Lab3.Controllers
{
    public class UsersController : ApiController
    {
        ChatContext db = new ChatContext();

        public IEnumerable<User> GetUsers()
        {
            return db.Users;
        }

        public User GetUser(int id)
        {
            User book = db.Users.Find(id);
            return book;
        }

        [HttpPost]
        public User IsExist([FromBody]User user)
        {
            User founded;
            try
            {
                DbSqlQuery<User> foundedUsers = db.Users.SqlQuery("Select * From Users Where login = " + "'" + user.Login.ToString() + "'" + ";");
                founded = foundedUsers.Single();
                if (founded.Password == user.Password)
                {
                    return founded;
                }
                return null;
            }
            catch
            {
                return null;

            }            
        }

        [HttpPut]
        public void EditUser(int id, [FromBody]User msg)
        {
            if (id == msg.Id)
            {
                db.Entry(msg).State = EntityState.Modified;

                db.SaveChanges();
            }
        }

        public void DeleteUser(int id)
        {
            User msg = db.Users.Find(id);
            if (msg != null)
            {
                db.Users.Remove(msg);
                db.SaveChanges();
            }
        }
    }
}