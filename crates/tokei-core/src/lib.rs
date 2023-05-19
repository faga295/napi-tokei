#![deny(clippy::all)]
use napi_derive::napi;
use std::env;
use tokei::{Config, Languages};

#[napi(object)]
pub struct Langs {
  pub lang: String,
  pub lines: u32,
  pub code: u32,
  pub comments: u32,
  pub blanks: u32,
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

#[napi(object)]
pub struct Options {
  pub include: Option<Vec<String>>,
  pub exclude: Option<Vec<String>>,
  pub langs: Option<Vec<String>>,
}
#[napi]
pub fn tokei(options: Options) -> Vec<Langs> {
  let config = Config::default();
  let mut languages = Languages::new();

  languages.get_statistics(
    &options
      .include
      .unwrap_or_else(|| vec![env::current_dir().unwrap().to_string_lossy().to_string()]),
    &options
      .exclude
      .unwrap_or_else(|| vec![])
      .iter()
      .map(|s| &**s)
      .collect::<Vec<&str>>(),
    &config,
  );
  let mut vec: Vec<Langs> = vec![];
  for item in languages.into_iter() {
    let lang = Langs {
      lang: item.0.to_string(),
      lines: (item.1.lines() as u32),
      code: (item.1.code as u32),
      comments: (item.1.comments as u32),
      blanks: (item.1.blanks as u32),
    };
    vec.push(lang)
  }
  vec
}
