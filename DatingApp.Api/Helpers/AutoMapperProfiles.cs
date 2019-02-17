using System.Linq;
using AutoMapper;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;

namespace DatingApp.Api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(r => r.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(r => r.Age, opt =>
            {
                opt.ResolveUsing(d => d.DateOfBIrth.CalculateAge());
            });

            CreateMap<User, UserForDetailedDto>()
            .ForMember(r => r.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(r => r.Age, opt =>
            {
                opt.ResolveUsing(d => d.DateOfBIrth.CalculateAge());
            });


            CreateMap<Photo, PhotosForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();
        }
    }
}