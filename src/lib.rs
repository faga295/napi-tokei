#![deny(clippy::all)]
use napi::bindgen_prelude::*;
use napi_derive::napi;
use tokei::{Config, Languages};

// #[derive(Debug)]
// enum LangType {
//   LanguageType(LanguageType),
// }
// impl fmt::Display for LangType {
//   fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//     write!(f, "{:?}", self)
//   }
// }

#[napi(object)]
pub struct Langs {
  pub name: String,
  pub code: u32,
  //   pub report: Report,
}
#[napi(object)]
pub struct Report {
  pub name: String,
  pub status: Vec<CodeStatus>,
}
#[napi(object)]
pub struct CodeStatus {
  pub blanks: u32,
  pub code: u32,
  pub comments: u32,
}

#[napi]
pub fn tokei() -> Vec<Langs> {
  let paths = &["playground"];
  let excluded = &["node_modules"];
  let config = Config::default();
  let mut languages = Languages::new();
  languages.get_statistics(paths, excluded, &config);
  let mut vec: Vec<Langs> = vec![];

  for item in languages.into_iter() {
    let lang = Langs {
      name: item.0.to_string(),
      code: (item.1.code as u32),
    };
    vec.push(lang)
  }
  vec
}
