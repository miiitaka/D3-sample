# D3-sample
Samples to display the D3.js.

## Reference URL
* https://d3js.org
* https://github.com/mbostock/d3
* https://www.w3.org/TR/SVG/
* https://developer.mozilla.org/ja/docs/Web/SVG

## SVGに関する基礎知識
* https://developer.mozilla.org/ja/docs/Web/SVG

## Method
* https://github.com/mbostock/d3/wiki/API-Reference

### attr()
属性の設定をします。
```
d3.select(".bar").attr("width", 200)
```

### data()
データの設定をします。
```
var bar = d3.selectAll("g").data(d)
```

### domain()
入力するデータの範囲を指定します。
```
d3.scale.linear().domain([0, 200])
```

### enter()
足りない要素を補填する。
```
var bar = d3.selectAll("g").data(d).enter().append("g")
```

### linear()
（リニア：線形）
```
d3.scale.linear()
```

### max()

配列の最大値を返します。

### transition()

アニメーションを追加します。

#### 1次元配列の場合
```
d3.max.(data)
```

#### 2次元配列の場合(moneyは連想配列名)
```
d3.max.(data, function(d){ return d.money; })
```

### ordinal()

```
d3.scale.ordinal()
```

### range()

### rangeBands()

### rangeRoundBands()

### rangePoints()
domain()の数に合わせて自動的に分割してくれます。
```
var test = d3.scale.ordinal().domain(["A","B","C","D","E"]).rangePoints([0,200]);
```

左右の余白指定がオプションで設定できます。(0.0〜1.0)
```
var test = d3.scale.ordinal().domain(["A","B","C","D","E"]).rangePoints([0,200], 0.1);
```


### select()
出力する要素を指定します。（単一要素）
複数対象がある場合は、一番最初の要素がセレクション対象になります。Class属性やID属性での指定も可能。
```
var body = d3.select("body")
```

### selectAll()
出力する要素を指定します。（複数要素）
指定要素全てがセレクション対象になります。Class属性やID属性での指定も可能。
```
var div = d3.selectAll("div")
```

### tsv()
TSVファイルを読み込みます。


## Property

### scale

```
d3.scale.linear()
```


## CSS

### fill
描画の塗色を指定
```
rect {
  fill: #ff0000;
}
```

### stroke
描画の枠線の色を指定
```
rect {
  stroke: #ff00ff;
}
```

### stroke-width
描画の枠線の太さ（幅）を指定
```
rect {
  stroke-width: 5px;
}
```