class View {
    constructor({ onClickNameMeme}) {
        this.memeNameOutputFieldNode = document.querySelector(".js-meme-name-output-field");
        this.memeNameOutputFieldNode.addEventListener("click", this._changeStatusMemeList);
        this.arrowOpenMemesListNode = document.querySelector(".js-arrow-open-memes-list");
        this.arrowOpenMemesListNode.addEventListener("click", this._changeStatusMemeList);
        this.listMemesNode = document.querySelector(".js-list-memes");
        this.inputUpperTextNode = document.querySelector(".js-upper-text__input");
        this.inputBottomTextNode = document.querySelector(".js-bottom-text__input");
        this.btnAddTextPreviewNode = document.querySelector(".js-btn-add-text-preview");
        this.btnAddTextPreviewNode.addEventListener("click", this._outputUpperAndLowerPreviewTexts);
        this.picturePreviewNode = document.querySelector(".js-preview-image__picture");
        this.upperTextNode = document.querySelector(".js-preview-image__upper-text");
        this.bottomTextNode = document.querySelector(".js-peview-image__bottom-text");
        this.onClickNameMeme = onClickNameMeme;

        // Отправляем выбранный мем в поле вывода и закрываем меню
        document.addEventListener("click", (e)=>{
            const ITEMS_MEMES_LIST = "js-list-memes__item";

            const selectedNameMeme = e.target;
            const contentMeme = e.target.textContent;
            if(selectedNameMeme.classList.contains(ITEMS_MEMES_LIST)){
                this._changeStatusMemeList();
                this.onClickNameMeme(selectedNameMeme, this.memeNameOutputFieldNode, contentMeme);
            };    
        });

        // Закрываем выпадающий список при клике по области находящейся вне этого списка
        $(document).on("click", function (e) {
            const itemsNotBelongingMemesList = e.target;

            const ID_BLOCK_INPUT_OUTPUT_NAME_MEMES = "#input-and-output-meme-names-id";
            const CLASS_NAME_LIST_MEMES = ".js-list-memes";
            const MODIFIER_OPEN_LIST_MEMES = "list-memes_open";
            const CLASS_NAME_ARROW_OPEN_MEMES_LIST = ".js-arrow-open-memes-list";
            const CSS_PROPERTY_ROTATION_IMAGE = "rotate";
            const VALUE_CSS_PROPERTY_ROTATION_IMAGE = "0deg";

            if (!$(itemsNotBelongingMemesList).closest(ID_BLOCK_INPUT_OUTPUT_NAME_MEMES).length) {
                if ($(CLASS_NAME_LIST_MEMES).hasClass(MODIFIER_OPEN_LIST_MEMES)) {
                    // Закрывает выпадающий список при клике по элементам вне списка
                    $(CLASS_NAME_LIST_MEMES).removeClass(MODIFIER_OPEN_LIST_MEMES);
                    // Возвращаем кнопку стрелки в исходное положение
                    $(CLASS_NAME_ARROW_OPEN_MEMES_LIST).css(CSS_PROPERTY_ROTATION_IMAGE, VALUE_CSS_PROPERTY_ROTATION_IMAGE);
                };
            };
        });

    }

    render(listMemes) {``
        this.listMemesNode.innerHTML = "";
        listMemes.forEach(meme => {
            this.listMemesNode.innerHTML += `
                <li><p class="js-list-memes__item list-memes__item">${meme.name}</p></li>
            `;
        });
    }

    renderPreview(previewUrl){
        this.picturePreviewNode.src = previewUrl;
    }

    _changeStatusMemeList = () => {
        const MODIFIER_OPEN_LIST_MEMES = "list-memes_open";
        const FIRST_VALUE_PROPERTY_ROTATION_IMAGE = "0deg";
        const SECOND_VALUE_PROPERTY_ROTATION_IMAGE = "180deg";

        // Открываем или закрываем выпадающее меню
        this.listMemesNode.classList.toggle(MODIFIER_OPEN_LIST_MEMES);

        // Меняем направление стрелки
        if (this.arrowOpenMemesListNode.style.rotate != SECOND_VALUE_PROPERTY_ROTATION_IMAGE) {
            this.arrowOpenMemesListNode.style.rotate = SECOND_VALUE_PROPERTY_ROTATION_IMAGE;
        } else {
            this.arrowOpenMemesListNode.style.rotate = FIRST_VALUE_PROPERTY_ROTATION_IMAGE;
        };
    }

    _outputUpperAndLowerPreviewTexts = () => {
        const upperTextPreview = this.inputUpperTextNode.value;
        const bottomTextPreview = this.inputBottomTextNode.value;
        this.upperTextNode.innerText = upperTextPreview;
        this.bottomTextNode.innerText = bottomTextPreview;
    }
}