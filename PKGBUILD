# Maintainer: Your Name <your.email@example.com>
pkgname=terminal-ui
pkgver=1.0.0
pkgrel=1
pkgdesc="A modern terminal interface with Ollama LLM integration"
arch=('x86_64')
url="https://github.com/yourusername/terminal-ui"
license=('MIT')
depends=('nodejs>=18' 'npm' 'python' 'xdg-utils' 'ollama')
makedepends=('git' 'nodejs-lts-hydrogen')
optdepends=('i3-wm: for i3 window manager integration')
source=("git+${url}.git")
sha256sums=('SKIP')
backup=("etc/polkit-1/rules.d/50-terminal-ui.rules")

package() {
    cd "$srcdir/$pkgname"

    # Create directories
    install -dm755 "$pkgdir/usr/lib/$pkgname"
    install -dm755 "$pkgdir/usr/bin"
    install -dm755 "$pkgdir/etc/polkit-1/rules.d"

    # Install application files
    cp -r {app,components,lib,hooks,public} "$pkgdir/usr/lib/$pkgname/"
    install -Dm644 package.json "$pkgdir/usr/lib/$pkgname/package.json"
    install -Dm644 next.config.js "$pkgdir/usr/lib/$pkgname/next.config.js"
    install -Dm644 tsconfig.json "$pkgdir/usr/lib/$pkgname/tsconfig.json"
    install -Dm644 tailwind.config.ts "$pkgdir/usr/lib/$pkgname/tailwind.config.ts"
    install -Dm644 postcss.config.js "$pkgdir/usr/lib/$pkgname/postcss.config.js"

    # Install polkit rules
    install -Dm644 packaging/50-terminal-ui.rules \
        "$pkgdir/etc/polkit-1/rules.d/50-terminal-ui.rules"

    # Install systemd service
    install -Dm644 packaging/terminal-ui.service \
        "$pkgdir/usr/lib/systemd/user/terminal-ui.service"

    # Install launcher script
    install -Dm755 packaging/terminal-ui.sh "$pkgdir/usr/bin/terminal-ui"

    # Install license and documentation
    install -Dm644 LICENSE "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
    install -Dm644 README.md "$pkgdir/usr/share/doc/$pkgname/README.md"

    # Install environment configuration
    install -Dm644 packaging/terminal-ui.env "$pkgdir/etc/terminal-ui.env"

    # Set up node_modules
    cd "$pkgdir/usr/lib/$pkgname"
    npm install --production
    npm run build
}