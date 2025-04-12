using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Feedback
    {
        public int FeedbackId {get; set;}
        public int UserId {get; set;}
        public User? User {get; set;}
        public string Feedbacktext {get; set;}
        public Datetime Date{get; set;}

    }
}