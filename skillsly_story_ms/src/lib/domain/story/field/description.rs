use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Description(Option<String>);

impl Description {
    pub fn new(description: &str) -> Self {
        Self(Some(description.to_owned()))
    }
    
    pub fn into_inner(self) -> String {
        match self.0 {
            Some(description) => description,
            None => String::from("")
        }
    }
}