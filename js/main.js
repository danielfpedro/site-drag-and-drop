$(function(){

    var $currentEditedElement = null;
    var $options = $('#options');

    var $formGroup = '<div class="form-group"></div>';

    $('div#block').draggable({
        revert: 'invalid',
        revertDuration: false,
        connectToSortable: '#canvas',
        helper: 'clone',
        opacity: 0.3
    })
    .disableSelection();
    $('#canvas').droppable({
        hoverClass: 'droppable-hover'
    });
    $('#canvas').sortable({
        revert: true,
        axis: 'y',
        forcePlaceholderSize: true,
        opacity: 0.5,
        placeholder: 'sortable-placeholder',
        stop: function(event, ui){
            if (ui.item.hasClass('item-block')) {
                var type = ui.item.data('type');
                var block = ui.item.data('block');
                $.get('blocks/' +type+ '/' + block+ '.php', function(html){
                    var $block = $('<div class="block-item"></div>') ;
                    $(html).appendTo($block);
                    ui.item.replaceWith($block);
                    $('.element-sortable').sortable({
                        axis: 'x',
                        opacity: 0.5,
                        forcePlaceholderSize: true,
                        placeholder: 'sortable-placeholder',
                    });
                });
            }
        }
    })
    .disableSelection();
    $('#canvas').on('click', "*[class*='element-']", function(){
        $options.html('');
    });
    $('#canvas').on('click', '.element-textarea', function(){
        $currentEditedElement = $(this);
        var $label = generateLabel('Texto');
        var $element = $('<textarea/>')
            .attr('id', 'option-textarea')
            .attr('rows', '6')
            .addClass('form-control input-sm')
            .val($.trim($currentEditedElement.text())) // Estava dando um espaço estranho no texto
            .insertAfter($label);
        return false;
    });
    $('#canvas').on('click', '.element-style', function(){
        $currentEditedElement = $(this);

        var $select = $('<select/>')
            .attr('id', 'option-image-style')
            .addClass('form-control')
            .appendTo($options);
        var $optNone = $('<option/>')
            .val('')
            .text('Nenhum')
            .appendTo($select);
        var $optCircle = $('<option/>')
            .val('circle')
            .text('Redonda')
            .appendTo($select);
        var $optRounded = $('<option/>')
            .val('rounded')
            .text('Arredondada')
            .appendTo($select);
        var $optThumbnail = $('<option/>')
            .val('thumbnail')
            .text('Thumbnail')
            .appendTo($select);
        var currentValue = $currentEditedElement.data('img-style');
        $select.val(currentValue);
        return false;
    });
    $('#canvas').on('click', '.element-image', function(){
        $currentEditedElement = $(this);

        var $label = $('<label/>')
            .text('Imagem')
            .appendTo($options);
        $label.wrap($formGroup);

        var $textarea = $('<textarea/>')
            .attr('id', 'option-image')
            .addClass('form-control')
            .attr('rows', 8)
            .val($.trim($currentEditedElement.attr('src')))
            .insertAfter($label);

        return false;
    });
    $('#canvas').on('click', '.element-text', function(){
        $currentEditedElement = $(this);

        var $label = $('<label/>')
            .text('Texto')
            .appendTo($options);
        $label.wrap($formGroup);
        var $element = $('<input/>')
            .attr('id', 'option-text')
            .attr('type', 'text')
            .addClass('form-control input-sm')
            .val($.trim($currentEditedElement.text()))
            .insertAfter($label);
        return false;
    });
    $('#canvas').on('click', '.element-add-brand-text', function(){
        $currentEditedElement = $(this);

        var $btn = $('<button/>')
            .attr('id', 'option-add-brand-text')
            .attr('type', 'button')
            .addClass('btn btn-primary btn-sm')
            .text('Adicionar título')
            .appendTo($options);
        $btn.wrap($formGroup);
        return false;
    });
    $('#canvas').on('click', '.element-add-brand-image', function(){
        $currentEditedElement = $(this);

        var $btn = $('<button/>')
            .attr('id', 'option-add-brand-image')
            .attr('type', 'button')
            .addClass('btn btn-primary btn-sm')
            .text('Adicionar imagem título')
            .appendTo($options);
        $btn.wrap($formGroup);
        return false;
    });
    $('#canvas').on('click', '.element-button', function(){
        $currentEditedElement = $(this);

        var $label = $('<label/>')
            .text('Estilo do botão')
            .appendTo($options);
        $label.wrap($formGroup);
        var $element = $('<select/>')
            .attr('id', 'option-btn-style')
            .addClass('form-control input-sm')
            .insertAfter($label);
        var primary = $('<option/>')
            .val('primary')
            .text('Padrão')
            .appendTo($element);
        var success = $('<option/>')
            .val('success')
            .text('Verde')
            .appendTo($element);
        var warning = $('<option/>')
            .val('warning')
            .text('Atenção')
            .appendTo($element);
        var danger = $('<option/>')
            .val('danger')
            .text('Perigo')
            .appendTo($element);

        var btnStyle = $currentEditedElement.data('btn-style');
        $element.val(btnStyle);
        return false;
    });
    function generateSelect(values, label, id, hasEmpty){
        if (typeof hasEmpty == 'undefined') {
            hasEmpty = true;
        }
        var $label = $('<label/>').text(label).appendTo($options);
        $label.wrap($formGroup);
        var $select = $('<select/>')
            .attr('id', id)
            .addClass('form-control input-sm')
            .insertAfter($label);
        if (hasEmpty) {
            $('<option/>')
                .text('Selecione:')
                .val('')
                .appendTo($select);
        }
        $.each(values, function(index, val) {
             $('<option/>')
                .text(val.label)
                .val(val.value)
                .appendTo($select);
        });
        return $select;
    }
    $('#canvas').on('click', '.element-button-size', function(){
        $currentEditedElement = $(this);

        $select = generateSelect([
            {label: 'Muito pequeno', value: 'xs'},
            {label: 'Pequeno', value: 'sm'},
            {label: 'Normal', value: 'regular'},
            {label: 'Grande', value: 'lg'}
        ],
            'Tamanho do Botão',
            'option-button-size',
            false
        );

        var btnSize = $currentEditedElement.data('button-size');
        $select.val(btnSize);
        return false;
    });
    $('#canvas').on('click', '.element-text-shadow', function(){
        $currentEditedElement = $(this);

        $select = generateSelect([
            {label: 'Dark', value: 'dark'},
            {label: 'Dark 70', value: 'dark-70'},
            {label: 'Dark 50', value: 'dark-50'},
            {label: 'Dark 25', value: 'dark-25'},
            {label: 'Light', value: 'light'},
            {label: 'Light 70', value: 'light-70'},
            {label: 'Light 50', value: 'light-50'},
            {label: 'Light 25', value: 'light-25'}
        ],
            'Sombra do texto',
            'option-text-shadow'
        );

        var textShadow = $currentEditedElement.data('text-shadow');
        $select.val(textShadow);
        return false;
    });
    $('#canvas').on('click', '.element-text-color', function(){
        $currentEditedElement = $(this);

        var $label = generateLabel('Cor do texto');
        var $element = $('<select/>')
            .attr('id', 'option-text-color')
            .addClass('form-control input-sm')
            .insertAfter($label);
        var $light = $('<option/>')
            .val('light')
            .text('Branco')
            .appendTo($element);
        var $clouds = $('<option/>')
            .val('clouds')
            .text('Nuvens')
            .appendTo($element);
        var $concrete = $('<option/>')
            .val('concrete')
            .text('Concrete')
            .appendTo($element);
        var $silver = $('<option/>')
            .val('silver')
            .text('Prata')
            .appendTo($element);
        var $asbestos = $('<option/>')
            .val('asbestos')
            .text('Sujo')
            .appendTo($element);
        var $preto = $('<option/>')
            .val('dark')
            .text('Preto')
            .appendTo($element);

        var textColor = $currentEditedElement.data('text-color');
        $element.val(textColor);
        return false;
    });
    function generateLabel(text){
        var $label = $('<label/>')
            .text(text)
            .appendTo($options);
        $label.wrap($formGroup);
        return $label;
    }
    $('#canvas').on('click', '.element-duplicate-list-item', function(){
        $currentEditedElement = $(this);

        $cont = $('<div/>').appendTo($options);
        var $element = $('<button/>')
            .attr('id', 'option-duplicate-list-item')
            .addClass('btn btn-danger btn-sm')
            .text('Duplicar item')
            .appendTo($cont);
        $element.wrap($formGroup);
    });
    $('#canvas').on('click', '.element-duplicate', function(){
        $currentEditedElement = $(this);

        $cont = $('<div/>').appendTo($options);
        var $element = $('<button/>')
            .attr('id', 'option-duplicate')
            .addClass('btn btn-danger btn-sm')
            .text('Duplicar Elemento')
            .appendTo($cont);
        $element.wrap($formGroup);
    });
    $('#canvas').on('click', '.element-navbar-style', function(){
        $currentEditedElement = $(this);
        var currentStyle = $currentEditedElement.data('navbar-style');

        var $element = generateSelect([
            {label: 'Claro', value: 'default'},
            {label: 'Escuro', value: 'inverse'},
        ],
            'Estilo do menu',
            'option-navbar-style',
            false
        );

        $element.val(currentStyle);
    });
    $('#canvas').on('click', '.element-remove-block', function(){
        $currentEditedElement = $(this);
        
        $cont = $('<div/>').appendTo($options);
        var $element = $('<button/>')
            .attr('id', 'option-remove-block')
            .addClass('btn btn-danger btn-sm')
            .text('Remover Bloco')
            .appendTo($cont);
        $element.wrap($formGroup);
    });
    $('#canvas').on('click', '.element-remove', function(){
        $currentEditedElement = $(this);
        
        $cont = $('<div/>').appendTo($options);
        var $element = $('<button/>')
            .attr('id', 'option-remove')
            .addClass('btn btn-danger btn-sm')
            .text('Remover elemento')
            .appendTo($cont);
        $element.wrap($formGroup);
    });
    $('#canvas').on('click', '.element-remove-parent', function(){
        $currentEditedElement = $(this);
        
        $cont = $('<div/>').appendTo($options);
        var $element = $('<button/>')
            .attr('id', 'option-remove-parent')
            .addClass('btn btn-danger btn-sm')
            .text('Remover elemento')
            .appendTo($cont);
        $element.wrap($formGroup);
    });
    $('#canvas').on('click', '.element-link', function(){
        $currentEditedElement = $(this);

        var $label = $('<label/>')
            .text('Url')
            .appendTo($options);
        $label.wrap($formGroup);
        var $element = $('<input/>')
            .attr('id', 'option-link')
            .attr('type', 'text')
            .addClass('form-control input-sm')
            .val($currentEditedElement.attr('href'))
            .appendTo($label);

        return false;// Importante para os links nao serem acionados
    });
    $('#canvas').on('click', '.element-image-bg-v-align', function(){
        $currentEditedElement = $(this);
        
        var vAlign = 'top';
        if (typeof $currentEditedElement.data('image-bg-v-align') != 'undefined') {
            vAlign = $currentEditedElement.data('image-bg-v-align');
        }

        var $formGroup = $('<div class="form-group"></div>').appendTo($options);
        $('<label>Alinhamento Imagem de Fundo</label>').appendTo($formGroup);

        $top = $(getRadioVAlign('topo', 'top', ''))
            .appendTo($formGroup);
        $meio = $(getRadioVAlign('centro', 'center'))
            .appendTo($formGroup);
        $base = $(getRadioVAlign('base', 'bottom'))
            .appendTo($formGroup);

        $('#option-image-bg-v-align-' + vAlign).prop('checked', true);
    });

    function getRadioVAlign(label, value){
        return '<label class="radio-inline" ><input type="radio" name="v-align" id="option-image-bg-v-align-'+value+'" value="'+value+'">'+label+'</label>';
    }

    $('#canvas').on('click', '.element-image-bg', function(){
        $currentEditedElement = $(this);

        var $label = $('<label/>')
            .text('Imagem de Fundo')
            .appendTo($options);
        $label.wrap($formGroup);

        var $textarea = $('<textarea/>')
            .attr('id', 'option-image-bg')
            .addClass('form-control')
            .attr('rows', 4)
            .attr('placeholder', 'Cole aqui o link da sua imagem...')
            .val($currentEditedElement.data('image-bg'))
            .insertAfter($label);

    });
    $('#canvas').on('click', '.element-bg-color', function(){
        $currentEditedElement = $(this);

        var $label = $('<label/>')
            .text('Cor do Fundo')
            .appendTo($options);
        $label.wrap($formGroup);

        var $textarea = $('<input/>')
            .attr('type', 'color')
            .attr('id', 'option-bg-color')
            .addClass('form-control')
            .attr('rows', 4)
            .val($currentEditedElement.data('bg-color'))
            .insertAfter($label);

    });
    $('#canvas').on('click', '.element-video', function(){
        $currentEditedElement = $(this);

        var src = $currentEditedElement.data('src');

        var $element = $('<textarea/>')
            .attr('id', 'option-video')
            .addClass('form-control')
            .attr('placeholder', 'ID do vídeo no Youtube')
            .val(src)
            .appendTo($options);
    });
     $('#options').on('click', '[id^="option-image-bg-v-align-"]', function(){
        var $this = $(this);
        var vAlign = $this.val();

        $currentEditedElement
            .css('background-position', vAlign);

        $currentEditedElement
            .data('image-bg-v-align', vAlign);
    });
    $('#options').on('change', '#option-bg-color', function(){
        var $this = $(this);
        var value = $this.val();
        
        $currentEditedElement
            .data('bg-color', value)
            .css('background-color', value);
    });
    $('#options').on('keyup', '#option-image-bg', function(){
        var $this = $(this);
        var value = $this.val();
        
        if (value) {
            $currentEditedElement
                .data('image-bg', value)
                .css('background-image', 'url(' + value + ')');
        }
    });
    $('#options').on('click', '#option-add-brand-text', function(){
        var $target = $currentEditedElement.find('.container-fluid .navbar-header');
        var $brandText = $('<a/>')
            .attr('href', '#')
            .text('Título')
            .addClass('navbar-brand element-text element-link element-remove')
            .appendTo($target);
        
    });
    $('#options').on('click', '#option-add-brand-image', function(){
        var $target = $currentEditedElement.find('.container-fluid .navbar-header');
        var $brandA = $('<a/>')
            .attr('href', '#')
            .addClass('navbar-brand')
            .appendTo($target);
        var $branImage = $('<img/>')
            .attr('src', 'https://cdn4.iconfinder.com/data/icons/miu-flat-social/60/mail-128.png')
            .addClass('element-image element-remove-parent selectable')
            .attr('height', 20)
            .appendTo($brandA);
        
    });
    $('#options').on('click', '#option-remove-block', function(){
        var $block = $currentEditedElement.parents('.block-item');
        $block.fadeOut('fast', function(){
            $options.html('');
            $block.remove();
        });
    });
    $('#options').on('click', '#option-remove', function(){
        var id = $currentEditedElement.attr('id');
        canDelete = true;
        if ($currentEditedElement.hasClass('at-least-one')) {
            var total = $currentEditedElement.siblings('#' + id).length;
            console.log(total);
            if (total === 0) {
                canDelete = false;
            }
        }
        if (canDelete) {
            $currentEditedElement.fadeOut('fast', function(){
                $options.html('');
                $(this).remove();
            });
        } else {
            alert('Este elemento deve contar no mínimo um item');
        }
    });
    $('#options').on('click', '#option-remove-parent', function(){
        var $parent = $currentEditedElement.parent();
        var id = $currentEditedElement.parent().attr('id');
        canDelete = true;
        if ($currentEditedElement.hasClass('at-least-one')) {
            var total = $parent.siblings('#' + id).length;
            console.log(total);
            if (total === 0) {
                canDelete = false;
            }
        }
        if (canDelete) {
            $parent.fadeOut('fast', function(){
                $options.html('');
                $parent.remove();
            });
        } else {
            alert('Este elemento deve contar no mínimo um item');
        }
    });
    $('#options').on('click', '#option-duplicate-list-item', function(){
        var $cloned = $currentEditedElement.clone();
        var $li = $('<li/>');

        $cloned.appendTo($li);
        $li.insertAfter($currentEditedElement.parent('li'));
    });
    $('#options').on('click', '#option-duplicate', function(){
        var $cloned = $currentEditedElement.clone();
        $cloned.insertAfter($currentEditedElement);
    });
    $('#options').on('keyup', '#option-video', function(){
        var $this = $(this);
        $currentEditedElement.data('src', $this.val());
    });
    $('#options').on('keyup', '#option-text', function(){
        var $this = $(this);
        $currentEditedElement.text($this.val());
        console.log($this.val());
    });
    $('#options').on('keyup', '#option-textarea', function(){
        var $this = $(this);
        var value = $this.val().replace(/\r?\n/g, '<br>');
        $currentEditedElement.html(value);
        console.log($this.val());
    });
    $('#options').on('keyup', '#option-url', function(){
        var $this = $(this);
        $currentEditedElement.attr('href', $this.val());
        console.log($this.val());
    });
    $('#options').on('keyup', '#option-image', function(){
        var $this = $(this);
        var value = $this.val();
        $currentEditedElement
            .attr('src', value);
    });
    $('#options').on('change', '#option-btn-style', function(){
        var $this = $(this);
        var value = $this.val();

        var btnStyle = $currentEditedElement.data('btn-style');
        $currentEditedElement
            .removeClass(btnStyle)
            .addClass('btn-' + value)
            .data('btn-style', value);
    });
    $('#options').on('change', '#option-button-size', function(){
        var $this = $(this);
        var value = $this.val();

        var btnSize = $currentEditedElement.data('button-size');
        $currentEditedElement
            .removeClass('btn-' + btnSize)
            .addClass('btn-' + value)
            .data('button-size', value);
    });
    $('#options').on('change', '#option-text-shadow', function(){
        var $this = $(this);
        var value = $this.val();

        var textShadow = $currentEditedElement.data('text-shadow');
        $currentEditedElement
            .removeClass('text-shadow-' + textShadow)
            .addClass('text-shadow-' + value)
            .data('text-shadow', value);
    });
    $('#options').on('change', '#option-text-color', function(){
        var $this = $(this);
        var value = $this.val();

        var textColor = $currentEditedElement.data('text-color');
        $currentEditedElement
            .removeClass('text-' + textColor)
            .addClass('text-' + value)
            .data('text-color', value);
    });

    $('#options').on('change', '#option-image-style', function(){
        var $this = $(this);
        var value = $this.val();

        var imgStyle = $currentEditedElement.data('img-style');
        $currentEditedElement
            .removeClass('img-' + imgStyle)
            .addClass('img-' + value)
            .data('img-style', value);
    });

    $('#options').on('change', '#option-navbar-style', function(){
        var $this = $(this);
        var value = $this.val();

        var navbarStyle = $currentEditedElement.data('navbar-style');
        
        $currentEditedElement
            .removeClass('navbar-' + navbarStyle)
            .addClass('navbar-' + value)
            .data('navbar-style', value);
    });

    var optionsItems = {
        text: function(value){
            var $element = $('<input/>')
                .attr('id', 'option-text')
                .attr('type', 'text')
                .val(value);
            return $element;
        },
        url: function(value){
            var $element = $('<input/>')
                .attr('id', 'option-url')
                .attr('type', 'text')
                .val(value);
            return $element;
        }
    };
});