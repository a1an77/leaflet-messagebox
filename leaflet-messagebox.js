L.Control.Messagebox = L.Control.extend({
    options: {
        position: 'topright',
        timeout: 3000,
        type: undefined //additional class for different styling (leaflet-control-messagebox-TYPE)
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-ber leaflet-control-messagebox');
        //L.DomEvent.disableClickPropagation(this._container);
        return this._container;
    },

    show: function (message, timeout) {
        var elem = this._container;
        elem.innerHTML = message;
        
        if (this.options.type != undefined) {
            elem.className='leaflet-bar leaflet-control leaflet-control-messagebox' + " leaflet-control-messagebox-" + this.options.type
        }
        else { 
            elem.className='leaflet-bar leaflet-control leaflet-control-messagebox';
        }
        elem.style.display = 'block';

        timeout = timeout || this.options.timeout;

        if (typeof this.timeoutID == 'number') {
            clearTimeout(this.timeoutID);
        }
        this.timeoutID = setTimeout(function () {
            elem.style.display = 'none';
        }, timeout);
    },
    
    set_type: function (type) {
        this.options.type = type;
    },
    
    show_as: function(type,message) { 
        old_type=this.options.type;
        this.set_type(type);
        this.show(message);
        this.set_type(old_type);
    }
});

L.Map.mergeOptions({
    messagebox: false
});

L.Map.addInitHook(function () {
    if (this.options.messagebox) {
        this.messagebox = new L.Control.Messagebox();
        this.addControl(this.messagebox);
    }
});

L.control.messagebox = function (options) {
    return new L.Control.Messagebox(options);
};
