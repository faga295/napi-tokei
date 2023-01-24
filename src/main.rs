use tokei::{Config, LanguageType, Languages};

fn main() {
  // The paths to search. Accepts absolute, relative, and glob paths.
  let paths = &["src"];
  // Exclude any path that contains any of these strings.
  let excluded = &["target"];
  // `Config` allows you to configure what is searched and counted.
  let config = Config::default();

  let mut languages = Languages::new();
  languages.get_statistics(paths, excluded, &config);
  let rust = &languages[&LanguageType::Rust];

  println!("Lines of code: {}", rust.code);
}
