class Pixel {
    static get(context, x, y) {
        return context.getImageData(x, y, 1, 1).data;
    }
    static set(context, x, y, rgba) {
        context.fillStyle = "rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+(rgba[3]/255)+")";
        context.fillRect(x, y, 1, 1);
    }
}