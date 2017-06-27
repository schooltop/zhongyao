//function $(id){return document.getElementById(id)}
function offset(node) {
	var x = node.offsetLeft;
	var y = node.offsetTop;
	var w = node.offsetWidth;
	var h = node.offsetHeight;
	var parent = node.offsetParent;
	while (parent != null) {
		x += parent.offsetLeft;
		y += parent.offsetTop;
		parent = parent.offsetParent;
	}
	if (w == 0) {
		w += parseInt(node.currentStyle.width);
		w += parseInt(node.currentStyle.paddingRight);
		w += parseInt(node.currentStyle.paddingLeft);
		w += parseInt(node.currentStyle.borderWidth) * 2;
	}
	if (h == 0) {
		h += parseInt(node.currentStyle.height);
		h += parseInt(node.currentStyle.paddingTop);
		h += parseInt(node.currentStyle.paddingBottom);
		h += parseInt(node.currentStyle.borderWidth) * 2;
	}
	return { x: x, y: y, w: w, h: h };
}
/*
 *@Generator -> Surnfu - Email:Surnfu@126.com - QQ:31333716 Ver:1.0.0
 *@Copyright (c) 2009 Surnfu composition  http://www.on-cn.com
 *使用示例
 *==============================================================================
var a=new OrgNode()
	a.Text="节点文本"
	a.Description="节点描述"
	a.Link="节点链接"
	//a.customParam.Img="xxx" //自定义节点参数，需要设置节点模板
var b=new OrgNode()
	b.Text="节点文本"
	b.Description="节点描述"
	b.Link="节点链接"
a.Nodes.Add(b);
var OrgShows=new OrgShow(a);
	OrgShows.Top=50;  //设置顶距离
	OrgShows.Left=50; //设置左距离
	OrgShows.IntervalWidth=10; //设置节点间隔宽度
	OrgShows.IntervalHeight=20; //设置节点间隔高度
	OrgShows.ShowType=2;  //设置节点展示方式  1横向  2竖向
	OrgShows.BoxHeight=100;  //设置节点默认高度
	//OrgShows.BoxWidth=100; //设置节点默认宽度
	//OrgShows.BoxTemplet="="<div id=\"{Id}\" style=\"font-size:12px;padding:5px 5px 5px 5px;border:thin solid orange;background-color:lightgrey; clear:left;float:left;text-align:center;position:absolute;\" title=\"{Description}\" ><a href=\"{Link}\">{Text}</a></div>";自定义节点模板
	OrgShows.LineSize=2;  //设置线条大小
	OrgShows.LineColor=2;  //设置线条颜色
	OrgShows.Run()
 *==============================================================================
 */
var PriceNodes;

function OrgNode() {
	this.Text = null;
	this.Link = null;
	this.Description = null;
	this.BoxWidth = null;
	this.BoxHeight = null;
	this.parentNode = null;
	this.NodeGroupId = null; //同一层的级别序号,从零开始
	this.NodeOrderId = null; //同一级中的序号,从零开始
	this.TopLine = null;
	this.BottomLine = null;
	this.Depth = null;
	this.Top = null;
	this.Left = null;
	this.Type = null;
	this.Nodes = [];
	this.customParam = []; //节点自定义参数
    this.Index = null;

	var This = this;
	this.Nodes.Add = function (OrgNode_) {
		OrgNode_.parentNode = This;
		This.Nodes[This.Nodes.length] = OrgNode_;
        OrgNode_.Index = This.Nodes.length;

	}


	this.Box = null;
	this.Templet = null;
	this.Id = "OrgNode_" + GetRandomId(20);

	this.inIt = function () {

		//if(this.inIted==true)return;
		var tempDiv = document.createElement("DIV");
		//		document.body.appendChild(tempDiv);
        document.getElementById("box_test").appendChild(tempDiv);
		var tempHTML = this.Templet;
		tempHTML = tempHTML.replace("{Id}", this.Id);
		tempHTML = tempHTML.replace("CookieGroup({Id})", "CookieGroup('" + this.Id + "')");
		tempHTML = tempHTML.replace("addSyn({Id})", "addSyn('" + this.Id + "')");
		tempHTML = tempHTML.replace("{Text}", this.Text);
		tempHTML = (this.Link == null) ? tempHTML.replace("{Link}", "JavaScript:void(0)") : tempHTML.replace("{Link}", this.Link);
		tempHTML = tempHTML.replace("{Description}", this.Description);

		//console.log(this.Nodes);
        if (this.Nodes.length < 1) {
            _tmpstr = "";
            _arr = tempHTML.split("</div>");
            if (_arr.length > 1) {
                for (ii = 0; ii < _arr.length; ii++) {
                    if (_arr[ii].length > 1 && _arr[ii].indexOf("反应条件") < 0) {
                        _tmpstr = _tmpstr + _arr[ii] + "</div>";
                    }
                }
            }
            tempHTML = _tmpstr;
        }
		var node = new Object();
		if (this.parentNode != null) {
			this.customParam.parentId = this.parentNode.Id
			node.parentId = this.parentNode.Id
		}
		else {
			this.customParam.parentId = 0;
			node.parentId = 0;
		}
		this.customParam.Id = this.Id;
		//console.log(this.customParam);
		node.Id = this.Id;
		node.hasPrice = this.customParam["hasPrice"];
		node.cas = GetCAS(this.customParam["cas"]);
		node.smiles = this.customParam["h_semeils"];
		node.citationId = this.customParam["citationId"];
		node.yield = this.customParam["yield"];
		PriceNodes.push(node);
		//console.log(PriceNodes);
		for (var Param_ in this.customParam) {
            if (Param_ == "yield") {
                if (this.customParam[Param_] == "") {
                    if (this.customParam["hasPrice"] == 1) {
                        var _ccs = this.customParam["cas"];
                        //tempHTML = tempHTML.replace("{" + Param_ + "}", "<div onclick=\"historyPrice('"+this.customParam["cas"]+"')\" class=\"priceBtn\"><a class=\"btn_bg btn_bgGreen sepV_a\" style=\"cursor:pointer;\">历史报价</a></div>");
                        tempHTML = tempHTML.replace("{" + Param_ + "}", "<div onclick=\"historyPrice('" + _ccs.substring(_ccs.indexOf("product") + 8, _ccs.indexOf(".html")) + "')\" class=\"priceBtn\"><a class=\"btn_bg btn_bgGreen sepV_a\" style=\"cursor:pointer;\">历史报价</a></div>");
                    } else {
                        //tempHTML = tempHTML.replace("{" + Param_ + "}", "<div><a class='btn_bg btn_bgOrange sepV_a inBtn' style=\"cursor:pointer;\" onclick=\"price_inquiry_new_1('"+_ccs.substring(_ccs.indexOf("product")+8,_ccs.indexOf(".html"))+"')\">委托求购</a></div>");
                        tempHTML = tempHTML.replace("{" + Param_ + "}", "");
                        //tempHTML = tempHTML.replace("{" + Param_ + "}", "<div onclick=\"historyPrice('26299-14-9')\" class=\"priceBtn\"><a class=\"btn_bg btn_bgGreen sepV_a\" style=\"cursor:pointer;\">历史报价</a></div>");
                    }
					tempHTML = tempHTML.replace("{" + Param_ + "}", "");
                }
				else {
                    if (this.customParam["hasPrice"] == 1) {
                        var _ccs = this.customParam["cas"];
                        if (this.customParam[Param_].indexOf("未提供") > 0) {
                            tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_] + "<br><div onclick=\"historyPrice('" + _ccs.substring(_ccs.indexOf("product") + 8, _ccs.indexOf(".html")) + "')\" class=\"priceBtn\"><a class=\"btn_bg btn_bgGreen sepV_a\" style=\"cursor:pointer;\">历史报价</a></div>");
                        } else {
                            tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_] + "<br><div onclick=\"historyPrice('" + _ccs.substring(_ccs.indexOf("product") + 8, _ccs.indexOf(".html")) + "')\" class=\"priceBtn\"><a class=\"btn_bg btn_bgGreen sepV_a\" style=\"cursor:pointer;\">历史报价</a></div>");
                        }
                    }
					else {
                        if (this.customParam[Param_].indexOf("未提供") > 0) {
                            tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_]);
                        } else {
                            //tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_] + "%<br><div><a class='btn_bg btn_bgOrange sepV_a inBtn' style=\"cursor:pointer;\"  onclick=\"price_inquiry_new_1('"+_ccs.substring(_ccs.indexOf("product")+8,_ccs.indexOf(".html"))+"')\">委托求购</a></div>");
                            tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_]);
                        }
                    }
                }
            }
			else {
                if (Param_ == "cas") {
                    if (this.customParam[Param_] == null || this.customParam[Param_] == "" || this.customParam[Param_] == "null") {
                        tempHTML = tempHTML.replace("{" + Param_ + "}", "无数据");
                    }
					else {
                        tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_]);
                    }
                }
				else {
                    tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_]);
                }
				if (Param_ == "mol_Mass") {
					tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_]);
				}
				
            }
		}
        //alert(tempHTML);
		tempDiv.innerHTML = tempHTML;
		this.Box = document.getElementById(this.Id);

		if (this.BoxWidth != null) {
			if (offset(this.Box).w < this.BoxWidth) {
				this.Box.style.width = this.BoxWidth + "px";
				if (offset(this.Box).w > this.BoxWidth) {
					this.Box.style.width = (this.BoxWidth - (offset(this.Box).w - this.BoxWidth)) + "px";
				}
			}
		}

		if (this.BoxHeight != null) {
			if (offset(this.Box).h < this.BoxHeight) {
				this.Box.style.height = this.BoxHeight + "px";
				if (offset(this.Box).h > this.BoxHeight) {
					this.Box.style.height = (this.BoxHeight - (offset(this.Box).h - this.BoxHeight)) + "px";
				}
			}
		}

		this.Width = offset(this.Box).w;
		this.Height = offset(this.Box).h;
		this.inIted = true;
	}

	function GetRandomId(n_) {
		var litter = "abcdefghijklmnopqrstuvwxyz"
		litter += litter.toUpperCase()
		litter += "1234567890";
		var idRnd = "";
		for (var i = 1; i <= n_; i++) {
			idRnd += litter.substr((0 + Math.round(Math.random() * (litter.length - 0))), 1)
		}
        return idRnd;
	}
}


function OrgShow(OrgNode_) {
	this.LineSize = 2;
	this.LineColor = "#000000";

	this.IntervalWidth = 100;
	this.IntervalHeight = 50;
	this.Top = 0;
	this.Left = 0;
	this.Depth = 0;
	this.Nodes = [];
	this.DepthGroup = []; //this.DepthGroup[n].Nodes 层深节点集合
	//this.DepthGroup[n].NodeGroups[m]  层深节点按上层分类集合 this.DepthGroup[n].NodeGroups[m][k]层深节点
	var This = this;
	this.BoxWidth = null;
	this.BoxHeight = null;
	this.BoxTemplet = null;
	this.ShowType = null;

	this.Run = function () {
        document.getElementById("box_test").innerHTML = "";
        PriceNodes = new Array();
		BoxInit(OrgNode_);
		var str=JSON.stringify(PriceNodes);
		localStorage.tree=str;
		console.log(localStorage.tree);
		GetDepth(OrgNode_);
		SetDepthsWidth()//设置层深高度

		//***************************
		for (var n = 1; n <= this.Depth; n++) {//设置左距离
			var tempLeft = this.Left + GetDepthWidthToRoot(n);
			var tempNodes = this.DepthGroup[n].Nodes;
			for (var m = 0; m < tempNodes.length; m++) {
				tempNodes[m].Left = tempLeft;
			}
		}

		//***************************
		for (var n = this.Depth; n >= 1; n--) {//设置顶距离
			var DepthNodes = this.DepthGroup[n].Nodes;
			if (n == this.Depth) {
				for (var m = 0; m < DepthNodes.length; m++) {
					if (m == 0) {
						DepthNodes[m].Top = 0;
					} else {
						DepthNodes[m].Top = DepthNodes[m - 1].Top + DepthNodes[m - 1].Height + this.IntervalHeight;
					}
				}
			} else {
				for (var m = 0; m < DepthNodes.length; m++) {//根据下级节点位置，确定节点位置
					if (DepthNodes[m].Nodes.length != 0) {
						var tempNodeTop_ = DepthNodes[m].Nodes[0].Top + (GetGroupHeightByNode(DepthNodes[m].Nodes[0]) / 2);
						tempNodeTop_ -= (DepthNodes[m].Height / 2);
						DepthNodes[m].Top = tempNodeTop_;
					}
				}
				for (var m = 0; m < DepthNodes.length; m++) {
					if (DepthNodes[m].Top == null) {//没有下级节点的，
						SetTopByDepthNode(DepthNodes, m, "LTR");
					}
				}

				for (var m = 1; m < DepthNodes.length; m++) {//修正错误位置
					var ErrDistance = this.IntervalHeight - (DepthNodes[m].Top - DepthNodes[m - 1].Top - DepthNodes[m - 1].Height);
					if (ErrDistance > 0) {
						for (var u_ = m; u_ < DepthNodes.length; u_++) {
							AmendNodeTop(DepthNodes[u_], ErrDistance);
						}
					}
				}
			}
		}
		SetDepthGroupHeight();//设置群组宽度 here

		var MaxTopValue = this.Nodes[0].Top;
		for (var n = 1; n < this.Nodes.length; n++) {//取得最小左距离
			if (MaxTopValue > this.Nodes[n].Top) {
				MaxTopValue = this.Nodes[n].Top;
			}
		}
		MaxTopValue = (-MaxTopValue) + this.Top;
		for (var n = 0; n < this.Nodes.length; n++) {//重新设置距离
			this.Nodes[n].Top += MaxTopValue;
			this.Nodes[n].Box.style.left = this.Nodes[n].Left + "px"
			this.Nodes[n].Box.style.top = this.Nodes[n].Top + "px"
		}


		//***************************
		for (var n = 1; n <= this.Depth; n++) {//设置竖线条
			var tempNodes = this.DepthGroup[n].Nodes;
			for (var m = 0; m < tempNodes.length; m++) {
				if (n != this.Depth) {//设置底线条
					if (tempNodes[m].Nodes.length != 0) {
						var tempLineTop = tempNodes[m].Top + (tempNodes[m].Height / 2);
						var tempLineWidth = ((this.IntervalWidth - this.LineSize) / 2);
						tempLineWidth += (this.DepthGroup[n].Width - tempNodes[m].Width);
						var tempLineLeft = tempNodes[m].Left + tempNodes[m].Width;
						var tempBottomLine = new CreateLine(1, tempLineTop, tempLineLeft, tempLineWidth, this.LineSize, this.LineColor, "LineBottom_" + tempNodes[m].Id);
						tempNodes[m].BottomLine = tempBottomLine.Line;
					}
				}
				if (n != 1) {//设置顶线条
					var tempLineTop = tempNodes[m].Top + (tempNodes[m].Height / 2);
					var tempLineWidth = ((this.IntervalWidth - this.LineSize) / 2);
					var tempLineLeft = tempNodes[m].Left - tempLineWidth;
					if (this.DepthGroup[tempNodes[m].Depth].NodeGroups[tempNodes[m].NodeGroupId].length == 1) {//如果只有一个节点
						var tempBottomLineWidth = parseFloat(tempNodes[m].parentNode.BottomLine.style.width) + this.LineSize;
						tempNodes[m].parentNode.BottomLine.style.width = (tempLineWidth + tempBottomLineWidth) + "px";
					} else {
						var temptopLine = new CreateLine(1, tempLineTop, tempLineLeft, tempLineWidth, this.LineSize, this.LineColor, "LineTop_" + tempNodes[m].Id);
						tempNodes[m].TopLine = temptopLine.Line;
					}
				}
			}
		}

		for (var n = 2; n <= this.Depth; n++) {//设置横线条
			var tempNodeGroups_ = this.DepthGroup[n].NodeGroups;
			for (var m = 0; m < tempNodeGroups_.length; m++) {
				if (tempNodeGroups_[m].length != 1) {
					var tempLineHeight = tempNodeGroups_[m].Height - (tempNodeGroups_[m][0].Height / 2) + this.LineSize;
					tempLineHeight -= (tempNodeGroups_[m][tempNodeGroups_[m].length - 1].Height / 2);
					var tempLineLeft = tempNodeGroups_[m][0].Left - ((this.IntervalWidth - this.LineSize) / 2) - this.LineSize;
					var tempLineTop = tempNodeGroups_[m][0].Top + (tempNodeGroups_[m][0].Height / 2);
					var tempGroupLine = new CreateLine(2, tempLineTop, tempLineLeft, tempLineHeight, this.LineSize, this.LineColor, "LineGroup_" + tempNodeGroups_[m][0].Id);
				}
			}
		}

		//*************************************************************************************************

		function AmendNodeTop(Node_, ErrDistance_) {//修正错误位置
			Node_.Top = Node_.Top + ErrDistance_;
			if (Node_.Nodes.length != 0) {
				for (var n = 0; n < Node_.Nodes.length; n++) {
					AmendNodeTop(Node_.Nodes[n], ErrDistance_);
				}
			}

		}

        $('.OrgBox').hover(function () {
            $(this).find('.j_search').show();
            $(this).find('.j_search_line').show();
        }, function () {
            $(this).find('.j_search').hide();
            $(this).find('.j_search_line').hide();
        });
	}
	function GetGroupHeightByNode(Node_) {//根据群组中任一节点，取得群组宽度
		var tempNodesGroup_ = This.DepthGroup[Node_.Depth].NodeGroups[Node_.NodeGroupId];
		var tempGroupHeight_ = tempNodesGroup_[tempNodesGroup_.length - 1].Top - tempNodesGroup_[0].Top;
		tempGroupHeight_ += tempNodesGroup_[tempNodesGroup_.length - 1].Height
		return tempGroupHeight_;
	}


	function SetTopByDepthNode(DepthNodes_, NodeId, Type) {
		if (Type == "LTR" && NodeId == DepthNodes_.length - 1) {
			SetTopByDepthNode(DepthNodes_, NodeId, "RTL");
			return;
		}
		if (Type == "RTL" && NodeId == 0) {
			SetTopByDepthNode(DepthNodes_, NodeId, "LTR");
			return;
		}
		var FindIndex = null;
		if (Type == "LTR") {
			for (var r_ = NodeId + 1; r_ < DepthNodes_.length; r_++) {
				if (DepthNodes_[r_].Top != null) {
					FindIndex = r_;
					break;
				}
			}
			if (FindIndex == null) {
				SetTopByDepthNode(DepthNodes_, NodeId, "RTL");
				return;
			} else {
				for (var r_ = FindIndex - 1; r_ >= NodeId; r_--) {
					DepthNodes_[r_].Top = DepthNodes_[r_ + 1].Top - This.IntervalHeight - DepthNodes_[r_].Height;
				}
			}
		}
		if (Type == "RTL") {
			for (var r_ = NodeId - 1; r_ >= 0; r_--) {
				if (DepthNodes_[r_].Top != null) {
					FindIndex = r_;
					break;
				}
			}
			if (FindIndex == null) {
				SetTopByDepthNode(DepthNodes_, NodeId, "LTR");
				return;
			} else {
				for (var r_ = FindIndex + 1; r_ <= NodeId; r_++) {
					DepthNodes_[r_].Top = DepthNodes_[r_ - 1].Top + This.IntervalHeight + DepthNodes_[r_ - 1].Height;
				}
			}
		}
	}


	function GetDepthWidthToRoot(DepthId) {//取得距离左边的宽度
		var tempWidth_ = 0;
		for (var x_ = DepthId; x_ >= 1; x_--) {
			tempWidth_ += This.DepthGroup[x_].Width;
		}
		tempWidth_ += This.IntervalWidth * (DepthId - 1);
		tempWidth_ -= This.DepthGroup[DepthId].Width;
		return tempWidth_;
	}


	function SetTopPosByChildNode(Node_, ChildNode_) {//根据下级节点位置设置节点位置
		var tempNodeGroups = This.DepthGroup[ChildNode_.Depth].NodeGroups[ChildNode_.NodeGroupId];
		var tempNodeTop;
		if (tempNodeGroups.length == 1) {
			tempNodeTop = ((ChildNode_.Height / 2) + ChildNode_.Top) - (Node_.Height / 2);
		} else {
			tempNodeTop = GetFirstTopPos(ChildNode_) + (tempNodeGroups.Height / 2) - (Node_.Height / 2);
		}
		Node_.Top = tempNodeTop;
	}

	function GetFirstTopPos(Node_) {//根据节点位置取得同一级中首个节点位置
		if (Node_.NodeOrderId == 0) {//Node_为首节点
			return Node_.Top;
		}
		var tempHeight = 0;
		for (var k_ = 0; k_ <= Node_.NodeOrderId; k_++) {
			var tempGroupsNode = This.DepthGroup[Node_.Depth].NodeGroups[Node_.NodeGroupId][k_];
			tempHeight += tempGroupsNode.Height;
		}
		tempHeight += (Node_.NodeOrderId * This.IntervalHeight);
		return ((Node_.Top - tempHeight) + (Node_.Height / 2));
	}


	function ChildNodesHeight(OrgObj) {//取得层高
		var ReHeight = 0;
		for (var s_ = 0; s_ < OrgObj.Nodes.length; s_++) {
			ReHeight += OrgObj.Nodes[s_].Height;
		}
		ReHeight += (OrgObj.Nodes.length - 1) * This.IntervalWidth;
		return ReHeight;
	}

	function SetDepthGroupHeight() {//设置层深宽度
		for (var n_ = 1; n_ <= This.Depth; n_++) {
			var tempNodeGroups = This.DepthGroup[n_].NodeGroups;
			for (var m_ = 0; m_ < tempNodeGroups.length; m_++) {
				tempNodeGroups[m_].Height = GetGroupHeightByNode(tempNodeGroups[m_][0]);
			}
		}
	}


	function SetDepthsWidth() {//设置层深高度
		for (var n_ = 1; n_ <= This.Depth; n_++) {
			var tempNodes_ = This.DepthGroup[n_].Nodes;
			var MaxWidth = 0;
			for (var m_ = 0; m_ < tempNodes_.length; m_++) {
				if (tempNodes_[m_].Width > MaxWidth) {
					MaxWidth = tempNodes_[m_].Width;
				}
			}
			This.DepthGroup[n_].Width = MaxWidth;
		}
	}

	function GetDepth(OrgObj) {//取得层深,层群集
		This.Nodes[This.Nodes.length] = OrgObj;
		OrgObj.Depth = (This.Depth == 0) ? This.Depth + 1 : OrgObj.parentNode.Depth + 1;
		This.Depth = (OrgObj.Depth > This.Depth) ? OrgObj.Depth : This.Depth;
		if (typeof (This.DepthGroup[OrgObj.Depth]) != "object") {
			This.DepthGroup[OrgObj.Depth] = [];
			This.DepthGroup[OrgObj.Depth].Nodes = [];
			This.DepthGroup[OrgObj.Depth].NodeGroups = [];
		}
		This.DepthGroup[OrgObj.Depth].Nodes[This.DepthGroup[OrgObj.Depth].Nodes.length] = OrgObj;
		if (OrgObj.Depth == 1) {
			This.DepthGroup[OrgObj.Depth].NodeGroups[0] = [];
			This.DepthGroup[OrgObj.Depth].NodeGroups[0][0] = OrgObj;
			OrgObj.NodeGroupId = 0;
			OrgObj.NodeOrderId = 0;
		} else {
			if (This.DepthGroup[OrgObj.Depth].NodeGroups.length == 0) {
				This.DepthGroup[OrgObj.Depth].NodeGroups[0] = [];
				This.DepthGroup[OrgObj.Depth].NodeGroups[0][0] = OrgObj;
				OrgObj.NodeGroupId = 0;
				OrgObj.NodeOrderId = 0;
			} else {
				var GroupsLength = This.DepthGroup[OrgObj.Depth].NodeGroups.length;
				var GroupNodesLength = This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength - 1].length;
				if (OrgObj.parentNode == This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength - 1][GroupNodesLength - 1].parentNode) {
					This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength - 1][GroupNodesLength] = OrgObj;
					OrgObj.NodeGroupId = GroupsLength - 1;
					OrgObj.NodeOrderId = GroupNodesLength;
				} else {
					if (typeof (This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength]) != "object") {
						This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength] = [];
					}
					GroupNodesLength = This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength].length;
					This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength][GroupNodesLength] = OrgObj;
					OrgObj.NodeGroupId = GroupsLength;
					OrgObj.NodeOrderId = GroupNodesLength;
				}
			}
		}

		if (OrgObj.Nodes.length != 0) {
			for (var n = 0; n < OrgObj.Nodes.length; n++) {
				GetDepth(OrgObj.Nodes[n]);
			}
		}
	}
	function BoxInit(OrgObj_) {//节点初始化
		OrgObj_.Templet = GetBoxTemplet();
		OrgObj_.BoxWidth = This.BoxWidth;
		OrgObj_.BoxHeight = This.BoxHeight;
		OrgObj_.Top = 0;
		OrgObj_.inIt();

		//alert(OrgObj_.customParam.h_semeils);
		if (OrgObj_.Nodes.length != 0) {
			for (var n = 0; n < OrgObj_.Nodes.length; n++) {
				BoxInit(OrgObj_.Nodes[n]);
			}
		}
	}

	function GetBoxTemplet() {//取得节点模板
		if (This.BoxTemplet != null) return This.BoxTemplet;
		var TempletStr = "<div id=\"{Id}\" style=\"font-size:12px;padding:5px 5px 5px 5px;border:thin solid orange;background-color:lightgrey; clear:left;float:left;text-align:center;position:absolute;"
		if (This.ShowType == 2) TempletStr += "writing-mode: tb-rl;";
		TempletStr += "\" title=\"{Description}\" ><a href=\"{Link}\" target=\"_blank\">{Text}</a></div>";
		return TempletStr;
	}

	function CreateLine(type_, top_, left_, long_, size_, color_, id_) {
		this.Type = type_;
		top_ = top_ + "";
		left_ = left_ + "";
		long_ = long_ + "";
		this.Top = (top_.substr(top_.length - 2).toLowerCase() != "px") ? top_ + "px" : top_;
		this.Left = (left_.substr(left_.length - 2).toLowerCase() != "px") ? left_ + "px" : left_;
		this.Long = (long_.substr(long_.length - 2).toLowerCase() != "px") ? long_ + "px" : long_;
		this.Size = (size_ == undefined) ? "1px" : size_ + "";
		this.Id = (id_ == undefined) ? null : id_;
		this.Size = (this.Size.substr(this.Size.length - 2).toLowerCase() != "px") ? this.Size + "px" : this.Size;
		this.Color = (color_ == undefined) ? "#000000" : color_;
		this.Line = document.createElement("DIV");
		//		document.body.appendChild(this.Line);
        document.getElementById("box_test").appendChild(this.Line);
		this.Line.innerText = "x";
		this.Line.style.position = "absolute";
		this.Line.style.top = this.Top;
		this.Line.style.left = this.Left;
		this.Line.style.overflow = "hidden";
		if (this.Type == 1) {
			this.Line.style.borderTopColor = this.Color;
			this.Line.style.borderTopWidth = this.Size;
			this.Line.style.borderTopStyle = "solid";
			this.Line.style.width = this.Long;
			this.Line.style.height = "0px";
		} else {
			this.Line.style.borderLeftColor = this.Color;
			this.Line.style.borderLeftWidth = this.Size;
			this.Line.style.borderLeftStyle = "solid";
			this.Line.style.height = this.Long;
			this.Line.style.width = "0px";
		}
		if (this.Id != null) this.Line.id = this.Id;
	}

}


function GetCAS(data) {
	if (data == null)
		return "";
	var casdata = /(\d{2,7}-\d{2,2}-\d)/;
	var arr;
	if ((arr = casdata.exec(data)) != null) {
		return arr[0]
	}
	else {
		return "";
	}
}

