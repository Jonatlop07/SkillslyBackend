use rocket::tokio;
use skillsly_story_ms::infrastructure::data::{configure};

fn main() {
    let rt = tokio::runtime::Runtime::new()
        .expect("failed to spawn tokio runtime");
    let database = rt.block_on(async move {
        configure().await
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