using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lab3.Models;
using System.Data;
using System.Data.Entity.Infrastructure;

namespace Lab3.Controllers
{
    public class ValuesController : ApiController
    {
        ChatContext db = new ChatContext();
 
        public IEnumerable<Message> GetMessages()
        {
            return db.Messages;
        }

        public IEnumerable<Message> GetMessagesStartWith(int id)
        {          
            try
            {
                DbSqlQuery<Message> foundedUsers = 
                    db.Messages.SqlQuery("Select * From Messages Where Id > "  + "'" + id.ToString() + "'" + ";");
                return foundedUsers;
            }
            catch
            {
                return null;
            };
        }
 
        [HttpPost]
        public void CreateMessage([FromBody]Message msg)
        {
            db.Messages.Add(msg);
            db.SaveChanges();
        }
 
        [HttpPut]
        public void EditMesage(int id, [FromBody]Message msg)
        {
            if (id == msg.Id)
            {
                db.Entry(msg).State = EntityState.Modified; 
                db.SaveChanges();
            }
        }
 
        public void DeleteMessage(int id)
        {
            Message msg = db.Messages.Find(id);
            if (msg != null)
            {
                db.Messages.Remove(msg);
                db.SaveChanges();
            }
        }
    }
}