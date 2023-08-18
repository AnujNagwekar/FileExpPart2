const DataStore = {
    render() {
        this.counterElement = document.getElementById('main_section');
        this.counterElement.innerHTML = ''
        const store = Structure.getState();
        Iterate_Children_for_print(this.counterElement , store)
    }
}


DataStore.render();