use uuid::Uuid;
use std::str::FromStr;
use serde::{Deserialize, Serialize};
use derive_more::{Display, From};

#[derive(Clone, Debug, From, Display, Eq, PartialEq, Deserialize, Serialize)]
pub struct DbId(Uuid);

impl DbId {
    pub fn new() -> DbId {
        Uuid::new_v4().into()
    }

    pub fn nil() -> DbId {
        Self(Uuid::nil())
    }
    
    pub fn into_inner(self) -> Uuid {
        self.0
    }
}

impl From<DbId> for String {
    fn from(id: DbId) -> Self {
        format!("{}", id.0)
    }
}

impl Default for DbId {
    fn default() -> Self {
        Self::new()
    }
}

impl FromStr for DbId {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(Uuid::parse_str(id)?))
    }
}
