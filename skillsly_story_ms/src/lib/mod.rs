pub mod infrastructure;
pub mod domain;
pub mod service;
pub mod application;

use std::sync::Arc;
use rocket::{Build, Rocket};
use rocket::fairing::AdHoc;

pub use domain::story::{Story, StoryError};

use crate::application::web::api::configure_routes;
use crate::infrastructure::data::DatabasePool;
use crate::infrastructure::data::story::query::PostgresStoryRepositoryImpl;
use crate::service::StoryService;
use crate::service::action::StoryServiceImpl;

pub struct RocketConfig {
    pub database: DatabasePool
}

pub fn rocket(config: RocketConfig) -> Rocket<Build> {
    rocket::build()
        .attach(AdHoc::on_ignite("Story", |rocket| {
            Box::pin(async move {
                let db_pool = Arc::new(config.database);
                rocket
                    .manage(
                        Box::new(configure_story(db_pool.clone()))
                            as Box<dyn StoryService>
                    )
                    .manage(db_pool)
            })
        }))
        .mount("/", configure_routes())
}

fn configure_story(db_pool: Arc<DatabasePool>) -> impl StoryService {
    StoryServiceImpl {
        gateway: PostgresStoryRepositoryImpl { db_pool }
    }
}