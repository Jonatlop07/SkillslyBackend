pub mod db_id;
pub mod story;

pub type DatabasePool = sqlx::postgres::PgPool;

pub async fn configure(connection_str: &str) -> DatabasePool {
    eprintln!("{:?}", connection_str);
    configure_with_connection_str(&connection_str).await
}

pub async fn configure_with_connection_str(connection_str: &str) -> DatabasePool {
    let pool = DatabasePool::connect(&connection_str).await;
    match pool {
        Ok(pool) => {
            sqlx::migrate!()
                .run(&pool)
                .await
                .expect("unable to migrate database");
            pool
        },
        Err(e) => {
            eprintln!("{}\n", e);
            eprintln!(
                "if the database has not yet been created,\
                    run: \n  $ sqlx database setup\n"
            );
            panic!("database connection error")
        }
    }
}

#[derive(Debug, thiserror::Error)]
pub enum DataError {
    #[error("database error: {0}")]
    Database(#[from] sqlx::Error)
}