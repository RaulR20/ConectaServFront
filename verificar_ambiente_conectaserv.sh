
#!/bin/bash

echo "🔍 Verificando ambiente para ConectaServ Web..."

# Verifica Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js instalado - versão: $(node -v)"
else
    echo "❌ Node.js não encontrado. Instale com: sudo apt install nodejs"
fi

# Verifica npm
if command -v npm &> /dev/null; then
    echo "✅ npm instalado - versão: $(npm -v)"
else
    echo "❌ npm não encontrado. Instale com: sudo apt install npm"
fi

# Verifica yarn
if command -v yarn &> /dev/null; then
    echo "✅ yarn instalado - versão: $(yarn -v)"
else
    echo "⚠️ yarn não encontrado. Pode instalar com: npm install -g yarn (opcional)"
fi

# Verifica expo
if command -v expo &> /dev/null; then
    echo "✅ Expo CLI instalado - versão: $(expo --version)"
else
    echo "⚠️ Expo CLI não encontrado. Instale com: npm install -g expo-cli"
fi

# Instala dependências se package.json estiver presente
if [ -f package.json ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas com sucesso."
else
    echo "❌ Nenhum package.json encontrado. Execute dentro da pasta /web do projeto."
fi
