use rocket::tokio;
use dotenv::dotenv;
use structopt::StructOpt;
use skillsly_story_ms::infrastructure::data::{configure};

#[derive(StructOpt, Debug)]
#[structopt(name = "httpd")]
struct Opt {
    #[structopt(default_value = "postgresql://postgres:jlc01070220@localhost/skillsly_story_db")]
    connection_string: String
}

fn main() {
    dotenv().ok();
    let opt = Opt::from_args();
    let rt = tokio::runtime::Runtime::new()
        .expect("failed to spawn tokio runtime");
    let database = rt.block_on(async move {
        configure(&opt.connection_string).await
    });
    let config = skillsly_story_ms::RocketConfig {
        database
    };
    rt.block_on(async move {
        skillsly_story_ms::rocket(config)
            .launch()
            .await
            .expect("failed to launch rocket server")
    });
    
}