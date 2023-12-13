WORKPLACE="$HOME/workplace/SakuinSeizouki"

WORKSPACE="$WORKPLACE/SakuinSeizoukiApi"

(
  cd "$WORKSPACE"
  ./scripts/gen.sh
)

WORKSPACE="$WORKPLACE/SakuinSeizoukiReactApp"
SCHEMA_PATH="$WORKPLACE/SakuinSeizoukiApi/api/openapi.yaml"

(
  cd "$WORKSPACE"
  rm -rf openapi-client
  npx openapi -i "$SCHEMA_PATH" -o openapi-client
)
