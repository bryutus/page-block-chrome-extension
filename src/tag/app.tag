<app>
  <add if={ !exists }></add>
  <release if={ exists }></release>

  <script>
    this.exists = opts.urlExists
  </script>
</app>

<add>
  <ul class="menu">
    <li class="menu-item">
      <div class="tile tile-centered">
        <div class="tile-content">
          Add to Block List
        </div>
      </div>
    </li>
    <li class="divider"></li>
    <li class="menu-item" each={ option }>
      <a href="#" onclick={ add }>
        <i class="icon icon-bookmark"></i>&nbsp;{ name }
      </a>
    </li>
  </ul>

  <script>
    this.option = [
      {name: 'Domain'},
      {name: 'URL'},
    ]

    add(e) {
      e.preventDefault()
      console.log(e)
    }
  </script>
</add>

<release>
  <ul class="menu">
    <li class="menu-item">
      <div class="tile tile-centered">
        <div class="tile-content">
          Release from Block List
        </div>
      </div>
    </li>
    <li class="divider"></li>
    <li class="menu-item" each={ option }>
      <a href="#">
        <i class="icon icon-delete"></i>&nbsp;{ name }
      </a>
    </li>
  </ul>

  <script>
    this.option = [
      {name: 'Temporarily'},
      {name: 'Forever'},
    ]
  </script>
</release>
