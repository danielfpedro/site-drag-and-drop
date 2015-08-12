<nav
    style="margin-bottom: 0;"
    class="selectable navbar navbar-default element-navbar-style element-add-brand-text element-add-brand-image element-remove-block"
    data-navbar-style="default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
                <img
                    class="element-image element-remove-parent selectable"
                    height="20"
                    src="https://cdn4.iconfinder.com/data/icons/miu-flat-social/60/mail-128.png">
            </a>
            <a
                class="navbar-brand element-text element-link element-remove selectable"
                href="#">
                Brand
            </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right element-sortable">
                <?php for($i = 1; $i <= 4; $i++): ?>
                    <li class="">
                        <a href="#" class="selectable element-link element-text element-duplicate-list-item element-remove-parent">
                            Link <?= $i ?>
                        </a>
                    </li>
                <?php endfor ?>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>