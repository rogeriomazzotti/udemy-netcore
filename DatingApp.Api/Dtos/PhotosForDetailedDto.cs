using System;

namespace DatingApp.Api.Dtos
{
    public class PhotosForDetailedDto
    {
         public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdd { get; set; }
        public bool IsMain { get; set; }
        public bool IsApproved { get; set; }

    }
}