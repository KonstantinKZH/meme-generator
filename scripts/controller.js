class Controller{
    constructor(){
        this.model = new Model({
            onUploadedMemes: this._handleUploadedMemes,
            onGettingPreviewUrl: this._processPreviewOutput,
        });
        this.view = new View({
            onClickNameMeme: this._showNameAndPreviewMeme,
        });
        this.api = new API();
    }

    init(){
        this.api.fetchMemes()
            .then(response => {
                this.model.setMemes(response);
            });
    }

    _handleUploadedMemes = (listMemes) => {
        this.view.render(listMemes);
    }

    _showNameAndPreviewMeme = (selectedNameMeme, memeNameOutputField, contentMeme) => {
        this.model.processingDataSelectedMeme(selectedNameMeme, memeNameOutputField, contentMeme);
    }

    _processPreviewOutput = (previewUrl) => {
        this.view.renderPreview(previewUrl);
    }
}