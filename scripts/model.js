class Model{
    constructor({onUploadedMemes, onGettingPreviewUrl}){
        this.listMemes = [];
        this.onUploadedMemes = onUploadedMemes;
        this.onGettingPreviewUrl = onGettingPreviewUrl;
    }

    setMemes(response){
        // Мы получили список мемов
        const listMemesResponse = response.data.memes;
        this.listMemes = listMemesResponse;

        this.onUploadedMemes(this.listMemes);
    }

    processingDataSelectedMeme(selectedNameMeme, memeNameOutputField, contentMeme){
        const nameMeme = selectedNameMeme.textContent;
        memeNameOutputField.innerText = nameMeme;

        this.listMemes.forEach(meme => {
            if(meme.name === contentMeme){
                const previewUrl = meme.url;
                this.onGettingPreviewUrl(previewUrl);
            };
        });
    }
}