<app>
  <ul class="menu">
    <li class="menu-item">
      <div class="tile tile-centered">
        <div class="tile-content">
          { title }
        </div>
      </div>
    </li>
    <li class="divider"></li>
    <li class="menu-item" each={ option }>
      <a href="#" onclick={ _update }>
        <i class="icon icon-{ icon }"></i>&nbsp;{ name }
      </a>
    </li>
  </ul>

  <script>
    this.data = {
      add: {
        title: 'Add to Block List',
        icon: 'bookmark',
        option: [
          {name: 'Domain'},
          {name: 'URL'},
        ],
      },
      release: {
        title: 'Release from Block List',
        icon: 'delete',
        option: [
          {name: 'Forever'},
        ],
      },
    }

    this.title = (opts.exists) ? this.data.release.title : this.data.add.title
    this.icon = (opts.exists) ? this.data.release.icon : this.data.add.icon
    this.option = (opts.exists) ? this.data.release.option: this.data.add.option
    this.list = (opts.list) ? opts.list : [];

    this._update = e => {
      e.preventDefault()

      let type = e.item.name.toLowerCase()
      switch (type) {
        case 'domain':
          this.add(type, opts.current[3])
          break;
        case 'url':
          this.add(type, opts.current[0])
          break;
        case 'forever':
          this.remove(opts.index)
          break;
        default:
          break;
      }

      chrome.storage.local.set({list: this.list}, () => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.tabs.reload(tabs[0].id, {bypassCache: true}, () => {
            window.close()
          });
        });
      });
    }

    this.add = (type, current) => {
      this.list.push({'type': type, 'value': current})
    }

    this.remove = index => {
      this.list.splice(index, 1)
    }
  </script>
</app>
