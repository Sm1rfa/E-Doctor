using Microsoft.Owin;
using OnlineHospital;
using Owin;

[assembly: OwinStartup(typeof (Startup))]

namespace OnlineHospital
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}